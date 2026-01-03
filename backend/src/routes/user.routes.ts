import express from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.middleware.js';
import bcrypt from 'bcryptjs';

const router = express.Router();
const prisma = new PrismaClient();

// Get all users (HR/Admin only)
router.get('/', authenticate, authorize('hr', 'admin'), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        employeeId: true,
        firstName: true,
        lastName: true,
        role: true,
        department: true,
        position: true,
        avatar: true,
        joinDate: true,
        phone: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch users',
    });
  }
});

// Get user by ID
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;

    // Users can only view their own profile unless they're HR/Admin
    if (id !== currentUser?.id && currentUser?.role !== 'hr' && currentUser?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        employeeId: true,
        firstName: true,
        lastName: true,
        role: true,
        department: true,
        position: true,
        avatar: true,
        joinDate: true,
        phone: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch user',
    });
  }
});

// Create user (HR/Admin only)
router.post(
  '/',
  authenticate,
  authorize('hr', 'admin'),
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('employeeId').notEmpty().withMessage('Employee ID is required'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('role').isIn(['employee', 'hr', 'admin']).withMessage('Invalid role'),
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

      const { email, password, employeeId, firstName, lastName, role, department, position, phone, address } = req.body;

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { employeeId },
          ],
        },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'User with this email or employee ID already exists',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          employeeId,
          firstName,
          lastName,
          role: role || 'employee',
          department: department || 'Unassigned',
          position: position || 'New Employee',
          phone,
          address,
        },
      });

      // Create leave balance
      await prisma.leaveBalance.create({
        data: {
          employeeId: user.id,
          annual: 20,
          sick: 10,
          personal: 5,
        },
      });

      const { password: _, ...userWithoutPassword } = user;

      res.status(201).json({
        success: true,
        data: userWithoutPassword,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to create user',
      });
    }
  }
);

// Update user
router.put(
  '/:id',
  authenticate,
  async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const currentUser = req.user;

      // Users can only update their own profile unless they're HR/Admin
      if (id !== currentUser?.id && currentUser?.role !== 'hr' && currentUser?.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Insufficient permissions',
        });
      }

      const { firstName, lastName, department, position, phone, address, avatar, password } = req.body;

      const updateData: any = {};
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (department && (currentUser?.role === 'hr' || currentUser?.role === 'admin')) updateData.department = department;
      if (position && (currentUser?.role === 'hr' || currentUser?.role === 'admin')) updateData.position = position;
      if (phone !== undefined) updateData.phone = phone;
      if (address !== undefined) updateData.address = address;
      if (avatar !== undefined) updateData.avatar = avatar;
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const user = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          email: true,
          employeeId: true,
          firstName: true,
          lastName: true,
          role: true,
          department: true,
          position: true,
          avatar: true,
          joinDate: true,
          phone: true,
          address: true,
        },
      });

      res.json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to update user',
      });
    }
  }
);

// Delete user (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete user',
    });
  }
});

export default router;

