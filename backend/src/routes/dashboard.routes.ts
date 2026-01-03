import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.middleware.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get dashboard statistics
router.get('/stats', authenticate, async (req: AuthRequest, res) => {
  try {
    const currentUser = req.user;

    // Get total employees (HR/Admin only)
    const totalEmployees = currentUser?.role === 'employee'
      ? 1
      : await prisma.user.count({
          where: { role: 'employee' },
        });

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get present today
    const presentToday = await prisma.attendanceRecord.count({
      where: {
        date: {
          gte: today,
          lt: tomorrow,
        },
        status: 'present',
      },
    });

    // Get on leave today
    const onLeave = await prisma.leaveRequest.count({
      where: {
        status: 'approved',
        startDate: {
          lte: today,
        },
        endDate: {
          gte: today,
        },
      },
    });

    // Get pending approvals (HR/Admin only)
    const pendingApprovals = currentUser?.role === 'employee'
      ? 0
      : await prisma.leaveRequest.count({
          where: { status: 'pending' },
        });

    res.json({
      success: true,
      data: {
        totalEmployees,
        presentToday,
        onLeave,
        pendingApprovals,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch dashboard statistics',
    });
  }
});

export default router;

