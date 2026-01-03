import express from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.middleware.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all leave requests
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const currentUser = req.user;
    const { status, employeeId } = req.query;

    const where: any = {};

    // Employees can only see their own requests
    if (currentUser?.role === 'employee') {
      where.employeeId = currentUser.id;
    } else if (employeeId) {
      const employee = await prisma.user.findUnique({
        where: { employeeId: employeeId as string },
      });
      if (employee) {
        where.employeeId = employee.id;
      }
    }

    if (status) {
      where.status = status;
    }

    const requests = await prisma.leaveRequest.findMany({
      where,
      include: {
        employee: {
          select: {
            id: true,
            employeeId: true,
            firstName: true,
            lastName: true,
          },
        },
        reviewer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        appliedOn: 'desc',
      },
    });

    const formattedRequests = requests.map(request => ({
      id: request.id,
      employeeId: request.employee.employeeId,
      employeeName: `${request.employee.firstName} ${request.employee.lastName}`,
      leaveType: request.leaveType,
      startDate: request.startDate.toISOString().split('T')[0],
      endDate: request.endDate.toISOString().split('T')[0],
      days: request.days,
      reason: request.reason,
      status: request.status,
      appliedOn: request.appliedOn.toISOString().split('T')[0],
      reviewedBy: request.reviewer ? `${request.reviewer.firstName} ${request.reviewer.lastName}` : undefined,
      reviewedOn: request.reviewedOn ? request.reviewedOn.toISOString().split('T')[0] : undefined,
      comments: request.comments,
    }));

    res.json({
      success: true,
      data: formattedRequests,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch leave requests',
    });
  }
});

// Get leave request by ID
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;

    const request = await prisma.leaveRequest.findUnique({
      where: { id },
      include: {
        employee: {
          select: {
            id: true,
            employeeId: true,
            firstName: true,
            lastName: true,
          },
        },
        reviewer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Leave request not found',
      });
    }

    // Employees can only see their own requests
    if (currentUser?.role === 'employee' && request.employeeId !== currentUser.id) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
      });
    }

    res.json({
      success: true,
      data: {
        id: request.id,
        employeeId: request.employee.employeeId,
        employeeName: `${request.employee.firstName} ${request.employee.lastName}`,
        leaveType: request.leaveType,
        startDate: request.startDate.toISOString().split('T')[0],
        endDate: request.endDate.toISOString().split('T')[0],
        days: request.days,
        reason: request.reason,
        status: request.status,
        appliedOn: request.appliedOn.toISOString().split('T')[0],
        reviewedBy: request.reviewer ? `${request.reviewer.firstName} ${request.reviewer.lastName}` : undefined,
        reviewedOn: request.reviewedOn ? request.reviewedOn.toISOString().split('T')[0] : undefined,
        comments: request.comments,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch leave request',
    });
  }
});

// Get leave balance
router.get('/balance/:employeeId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { employeeId } = req.params;
    const currentUser = req.user;

    const employee = await prisma.user.findUnique({
      where: { employeeId },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Employee not found',
      });
    }

    // Employees can only see their own balance
    if (currentUser?.role === 'employee' && currentUser.id !== employee.id) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
      });
    }

    let balance = await prisma.leaveBalance.findUnique({
      where: { employeeId: employee.id },
    });

    if (!balance) {
      // Create default balance if it doesn't exist
      balance = await prisma.leaveBalance.create({
        data: {
          employeeId: employee.id,
          annual: 20,
          sick: 10,
          personal: 5,
        },
      });
    }

    res.json({
      success: true,
      data: {
        annual: balance.annual,
        sick: balance.sick,
        personal: balance.personal,
        used: {
          annual: balance.usedAnnual,
          sick: balance.usedSick,
          personal: balance.usedPersonal,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch leave balance',
    });
  }
});

// Create leave request
router.post(
  '/',
  authenticate,
  [
    body('leaveType').isIn(['annual', 'sick', 'personal', 'unpaid']).withMessage('Invalid leave type'),
    body('startDate').isISO8601().withMessage('Valid start date is required'),
    body('endDate').isISO8601().withMessage('Valid end date is required'),
    body('reason').notEmpty().withMessage('Reason is required'),
  ],
  async (req: AuthRequest, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: errors.array()[0].msg,
        });
      }

      const { leaveType, startDate, endDate, reason, employeeId } = req.body;
      const currentUser = req.user;

      // Determine which employee ID to use
      const targetEmployeeId = employeeId && (currentUser?.role === 'hr' || currentUser?.role === 'admin')
        ? employeeId
        : currentUser?.id;

      if (!targetEmployeeId) {
        return res.status(400).json({
          success: false,
          error: 'Employee ID is required',
        });
      }

      // Find user by employeeId if provided, otherwise use current user
      let targetUser;
      if (employeeId && (currentUser?.role === 'hr' || currentUser?.role === 'admin')) {
        targetUser = await prisma.user.findUnique({
          where: { employeeId },
        });
        if (!targetUser) {
          return res.status(404).json({
            success: false,
            error: 'Employee not found',
          });
        }
      } else {
        targetUser = currentUser;
      }

      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      // Check leave balance
      let balance = await prisma.leaveBalance.findUnique({
        where: { employeeId: targetUser!.id },
      });

      if (!balance) {
        balance = await prisma.leaveBalance.create({
          data: {
            employeeId: targetUser!.id,
            annual: 20,
            sick: 10,
            personal: 5,
          },
        });
      }

      if (leaveType !== 'unpaid') {
        const available = balance[leaveType as 'annual' | 'sick' | 'personal'] - 
          balance[`used${leaveType.charAt(0).toUpperCase() + leaveType.slice(1)}` as 'usedAnnual' | 'usedSick' | 'usedPersonal'];
        
        if (available < days) {
          return res.status(400).json({
            success: false,
            error: `Insufficient ${leaveType} leave balance`,
          });
        }
      }

      const request = await prisma.leaveRequest.create({
        data: {
          employeeId: targetUser!.id,
          leaveType: leaveType as any,
          startDate: start,
          endDate: end,
          days,
          reason,
        },
        include: {
          employee: {
            select: {
              id: true,
              employeeId: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      res.status(201).json({
        success: true,
        data: {
          id: request.id,
          employeeId: request.employee.employeeId,
          employeeName: `${request.employee.firstName} ${request.employee.lastName}`,
          leaveType: request.leaveType,
          startDate: request.startDate.toISOString().split('T')[0],
          endDate: request.endDate.toISOString().split('T')[0],
          days: request.days,
          reason: request.reason,
          status: request.status,
          appliedOn: request.appliedOn.toISOString().split('T')[0],
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to create leave request',
      });
    }
  }
);

// Update leave request status (HR/Admin only)
router.put(
  '/:id',
  authenticate,
  authorize('hr', 'admin'),
  [
    body('status').isIn(['pending', 'approved', 'rejected']).withMessage('Invalid status'),
  ],
  async (req: AuthRequest, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: errors.array()[0].msg,
        });
      }

      const { id } = req.params;
      const { status, comments } = req.body;
      const currentUser = req.user;

      const request = await prisma.leaveRequest.findUnique({
        where: { id },
        include: {
          employee: true,
        },
      });

      if (!request) {
        return res.status(404).json({
          success: false,
          error: 'Leave request not found',
        });
      }

      // Update leave request
      const updatedRequest = await prisma.leaveRequest.update({
        where: { id },
        data: {
          status: status as any,
          reviewedBy: currentUser?.id,
          reviewedOn: new Date(),
          comments,
        },
        include: {
          employee: {
            select: {
              id: true,
              employeeId: true,
              firstName: true,
              lastName: true,
            },
          },
          reviewer: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      // Update leave balance if approved
      if (status === 'approved' && request.leaveType !== 'unpaid') {
        const balance = await prisma.leaveBalance.findUnique({
          where: { employeeId: request.employeeId },
        });

        if (balance) {
          const updateField = `used${request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)}` as 'usedAnnual' | 'usedSick' | 'usedPersonal';
          await prisma.leaveBalance.update({
            where: { employeeId: request.employeeId },
            data: {
              [updateField]: balance[updateField] + request.days,
            },
          });
        }
      }

      res.json({
        success: true,
        data: {
          id: updatedRequest.id,
          employeeId: updatedRequest.employee.employeeId,
          employeeName: `${updatedRequest.employee.firstName} ${updatedRequest.employee.lastName}`,
          leaveType: updatedRequest.leaveType,
          startDate: updatedRequest.startDate.toISOString().split('T')[0],
          endDate: updatedRequest.endDate.toISOString().split('T')[0],
          days: updatedRequest.days,
          reason: updatedRequest.reason,
          status: updatedRequest.status,
          appliedOn: updatedRequest.appliedOn.toISOString().split('T')[0],
          reviewedBy: updatedRequest.reviewer ? `${updatedRequest.reviewer.firstName} ${updatedRequest.reviewer.lastName}` : undefined,
          reviewedOn: updatedRequest.reviewedOn ? updatedRequest.reviewedOn.toISOString().split('T')[0] : undefined,
          comments: updatedRequest.comments,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to update leave request',
      });
    }
  }
);

// Delete leave request
router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;

    const request = await prisma.leaveRequest.findUnique({
      where: { id },
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Leave request not found',
      });
    }

    // Employees can only delete their own pending requests
    if (currentUser?.role === 'employee' && request.employeeId !== currentUser.id) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
      });
    }

    // Only pending requests can be deleted by employees
    if (currentUser?.role === 'employee' && request.status !== 'pending') {
      return res.status(400).json({
        success: false,
        error: 'Only pending requests can be deleted',
      });
    }

    await prisma.leaveRequest.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Leave request deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete leave request',
    });
  }
});

export default router;

