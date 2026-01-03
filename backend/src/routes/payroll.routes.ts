import express from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.middleware.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all payroll records
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const currentUser = req.user;
    const { employeeId, month, year } = req.query;

    const where: any = {};

    // Employees can only see their own records
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

    if (month) where.month = month;
    if (year) where.year = parseInt(year as string);

    const records = await prisma.payrollRecord.findMany({
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
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
      ],
    });

    const formattedRecords = records.map(record => ({
      id: record.id,
      employeeId: record.employee.employeeId,
      month: record.month,
      year: record.year,
      basicSalary: record.basicSalary,
      allowances: record.allowances,
      deductions: record.deductions,
      netSalary: record.netSalary,
      status: record.status,
      paidOn: record.paidOn ? record.paidOn.toISOString().split('T')[0] : undefined,
    }));

    res.json({
      success: true,
      data: formattedRecords,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch payroll records',
    });
  }
});

// Get payroll record by ID
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;

    const record = await prisma.payrollRecord.findUnique({
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
      },
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        error: 'Payroll record not found',
      });
    }

    // Employees can only see their own records
    if (currentUser?.role === 'employee' && record.employeeId !== currentUser.id) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
      });
    }

    res.json({
      success: true,
      data: {
        id: record.id,
        employeeId: record.employee.employeeId,
        month: record.month,
        year: record.year,
        basicSalary: record.basicSalary,
        allowances: record.allowances,
        deductions: record.deductions,
        netSalary: record.netSalary,
        status: record.status,
        paidOn: record.paidOn ? record.paidOn.toISOString().split('T')[0] : undefined,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch payroll record',
    });
  }
});

// Create payroll record (HR/Admin only)
router.post(
  '/',
  authenticate,
  authorize('hr', 'admin'),
  [
    body('employeeId').notEmpty().withMessage('Employee ID is required'),
    body('month').notEmpty().withMessage('Month is required'),
    body('year').isInt().withMessage('Valid year is required'),
    body('basicSalary').isFloat({ min: 0 }).withMessage('Valid basic salary is required'),
    body('allowances').optional().isFloat({ min: 0 }),
    body('deductions').optional().isFloat({ min: 0 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: errors.array()[0].msg,
        });
      }

      const { employeeId, month, year, basicSalary, allowances, deductions } = req.body;

      const employee = await prisma.user.findUnique({
        where: { employeeId },
      });

      if (!employee) {
        return res.status(404).json({
          success: false,
          error: 'Employee not found',
        });
      }

      const netSalary = basicSalary + (allowances || 0) - (deductions || 0);

      const record = await prisma.payrollRecord.upsert({
        where: {
          employeeId_month_year: {
            employeeId: employee.id,
            month,
            year: parseInt(year),
          },
        },
        update: {
          basicSalary,
          allowances: allowances || 0,
          deductions: deductions || 0,
          netSalary,
        },
        create: {
          employeeId: employee.id,
          month,
          year: parseInt(year),
          basicSalary,
          allowances: allowances || 0,
          deductions: deductions || 0,
          netSalary,
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
          month: record.month,
          year: record.year,
          basicSalary: record.basicSalary,
          allowances: record.allowances,
          deductions: record.deductions,
          netSalary: record.netSalary,
          status: record.status,
          paidOn: record.paidOn ? record.paidOn.toISOString().split('T')[0] : undefined,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to create payroll record',
      });
    }
  }
);

// Update payroll record (HR/Admin only)
router.put(
  '/:id',
  authenticate,
  authorize('hr', 'admin'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { month, year, basicSalary, allowances, deductions, status, paidOn } = req.body;

      const updateData: any = {};
      if (month) updateData.month = month;
      if (year) updateData.year = parseInt(year);
      if (basicSalary !== undefined) updateData.basicSalary = basicSalary;
      if (allowances !== undefined) updateData.allowances = allowances;
      if (deductions !== undefined) updateData.deductions = deductions;
      if (status) updateData.status = status;
      if (paidOn) updateData.paidOn = new Date(paidOn);

      // Recalculate net salary if salary components changed
      if (basicSalary !== undefined || allowances !== undefined || deductions !== undefined) {
        const current = await prisma.payrollRecord.findUnique({ where: { id } });
        if (current) {
          updateData.netSalary = (basicSalary ?? current.basicSalary) + 
            (allowances ?? current.allowances) - 
            (deductions ?? current.deductions);
        }
      }

      const record = await prisma.payrollRecord.update({
        where: { id },
        data: updateData,
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
          month: record.month,
          year: record.year,
          basicSalary: record.basicSalary,
          allowances: record.allowances,
          deductions: record.deductions,
          netSalary: record.netSalary,
          status: record.status,
          paidOn: record.paidOn ? record.paidOn.toISOString().split('T')[0] : undefined,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to update payroll record',
      });
    }
  }
);

// Delete payroll record (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.payrollRecord.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Payroll record deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete payroll record',
    });
  }
});

export default router;

