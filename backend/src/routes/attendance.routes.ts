import express from 'express';
import { body, validationResult, query } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.middleware.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all attendance records (HR/Admin can see all, employees see only their own)
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const currentUser = req.user;
    const { employeeId, startDate, endDate } = req.query;

    const where: any = {};

    // Employees can only see their own records
    if (currentUser?.role === 'employee') {
      where.employeeId = currentUser.id;
    } else if (employeeId) {
      where.employeeId = employeeId as string;
    }

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
    }

    const records = await prisma.attendanceRecord.findMany({
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
      },
      orderBy: {
        date: 'desc',
      },
    });

    const formattedRecords = records.map(record => ({
      id: record.id,
      employeeId: record.employee.employeeId,
      employeeName: `${record.employee.firstName} ${record.employee.lastName}`,
      date: record.date.toISOString().split('T')[0],
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      status: record.status,
      workHours: record.workHours,
    }));

    res.json({
      success: true,
      data: formattedRecords,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch attendance records',
    });
  }
});

// Get attendance by employee ID
router.get('/employee/:employeeId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { employeeId } = req.params;
    const currentUser = req.user;

    // Find user by employeeId
    const employee = await prisma.user.findUnique({
      where: { employeeId },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Employee not found',
      });
    }

    // Employees can only see their own records
    if (currentUser?.role === 'employee' && currentUser.id !== employee.id) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
      });
    }

    const records = await prisma.attendanceRecord.findMany({
      where: { employeeId: employee.id },
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
      orderBy: {
        date: 'desc',
      },
    });

    const formattedRecords = records.map(record => ({
      id: record.id,
      employeeId: record.employee.employeeId,
      employeeName: `${record.employee.firstName} ${record.employee.lastName}`,
      date: record.date.toISOString().split('T')[0],
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      status: record.status,
      workHours: record.workHours,
    }));

    res.json({
      success: true,
      data: formattedRecords,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch attendance records',
    });
  }
});

// Create attendance record
router.post(
  '/',
  authenticate,
  [
    body('date').isISO8601().withMessage('Valid date is required'),
    body('checkIn').optional().isString(),
    body('checkOut').optional().isString(),
    body('status').isIn(['present', 'absent', 'half_day', 'leave']).withMessage('Invalid status'),
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

      const { date, checkIn, checkOut, status, employeeId } = req.body;
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

      // Calculate work hours if checkIn and checkOut are provided
      let workHours: number | undefined;
      if (checkIn && checkOut) {
        const [inHour, inMin] = checkIn.split(':').map(Number);
        const [outHour, outMin] = checkOut.split(':').map(Number);
        const inMinutes = inHour * 60 + inMin;
        const outMinutes = outHour * 60 + outMin;
        workHours = (outMinutes - inMinutes) / 60;
      }

      const record = await prisma.attendanceRecord.upsert({
        where: {
          employeeId_date: {
            employeeId: targetUser!.id,
            date: new Date(date),
          },
        },
        update: {
          checkIn,
          checkOut,
          status: status as any,
          workHours,
        },
        create: {
          employeeId: targetUser!.id,
          date: new Date(date),
          checkIn,
          checkOut,
          status: status as any,
          workHours,
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
          id: record.id,
          employeeId: record.employee.employeeId,
          employeeName: `${record.employee.firstName} ${record.employee.lastName}`,
          date: record.date.toISOString().split('T')[0],
          checkIn: record.checkIn,
          checkOut: record.checkOut,
          status: record.status,
          workHours: record.workHours,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to create attendance record',
      });
    }
  }
);

// Update attendance record
router.put(
  '/:id',
  authenticate,
  authorize('hr', 'admin'),
  async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const { date, checkIn, checkOut, status } = req.body;

      let workHours: number | undefined;
      if (checkIn && checkOut) {
        const [inHour, inMin] = checkIn.split(':').map(Number);
        const [outHour, outMin] = checkOut.split(':').map(Number);
        const inMinutes = inHour * 60 + inMin;
        const outMinutes = outHour * 60 + outMin;
        workHours = (outMinutes - inMinutes) / 60;
      }

      const record = await prisma.attendanceRecord.update({
        where: { id },
        data: {
          ...(date && { date: new Date(date) }),
          ...(checkIn !== undefined && { checkIn }),
          ...(checkOut !== undefined && { checkOut }),
          ...(status && { status: status as any }),
          ...(workHours !== undefined && { workHours }),
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

      res.json({
        success: true,
        data: {
          id: record.id,
          employeeId: record.employee.employeeId,
          employeeName: `${record.employee.firstName} ${record.employee.lastName}`,
          date: record.date.toISOString().split('T')[0],
          checkIn: record.checkIn,
          checkOut: record.checkOut,
          status: record.status,
          workHours: record.workHours,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to update attendance record',
      });
    }
  }
);

// Delete attendance record
router.delete('/:id', authenticate, authorize('hr', 'admin'), async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.attendanceRecord.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Attendance record deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete attendance record',
    });
  }
});

export default router;

