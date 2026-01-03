import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dayflow.com' },
    update: {},
    create: {
      email: 'admin@dayflow.com',
      password: adminPassword,
      employeeId: 'EMP001',
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'admin',
      department: 'Human Resources',
      position: 'HR Director',
      phone: '+1 234 567 8900',
      address: '123 Main Street, New York, NY 10001',
      joinDate: new Date('2020-01-15'),
    },
  });

  // Create HR user
  const hrPassword = await bcrypt.hash('hr123', 10);
  const hr = await prisma.user.upsert({
    where: { email: 'hr@dayflow.com' },
    update: {},
    create: {
      email: 'hr@dayflow.com',
      password: hrPassword,
      employeeId: 'EMP002',
      firstName: 'Michael',
      lastName: 'Chen',
      role: 'hr',
      department: 'Human Resources',
      position: 'HR Manager',
      phone: '+1 234 567 8901',
      address: '456 Oak Avenue, New York, NY 10002',
      joinDate: new Date('2021-03-20'),
    },
  });

  // Create employee users
  const employeePassword = await bcrypt.hash('employee123', 10);
  const employees = [
    {
      email: 'employee@dayflow.com',
      employeeId: 'EMP003',
      firstName: 'Emily',
      lastName: 'Davis',
      department: 'Engineering',
      position: 'Software Engineer',
      phone: '+1 234 567 8902',
      address: '789 Pine Road, New York, NY 10003',
      joinDate: new Date('2022-06-01'),
    },
    {
      email: 'james.wilson@dayflow.com',
      employeeId: 'EMP004',
      firstName: 'James',
      lastName: 'Wilson',
      department: 'Engineering',
      position: 'Senior Developer',
      phone: '+1 234 567 8903',
      address: '321 Elm Street, New York, NY 10004',
      joinDate: new Date('2021-09-10'),
    },
    {
      email: 'lisa.taylor@dayflow.com',
      employeeId: 'EMP005',
      firstName: 'Lisa',
      lastName: 'Taylor',
      department: 'Marketing',
      position: 'Marketing Manager',
      phone: '+1 234 567 8904',
      address: '654 Cedar Lane, New York, NY 10005',
      joinDate: new Date('2020-11-05'),
    },
  ];

  const createdEmployees = [];
  for (const emp of employees) {
    const user = await prisma.user.upsert({
      where: { email: emp.email },
      update: {},
      create: {
        ...emp,
        password: employeePassword,
        role: 'employee',
      },
    });
    createdEmployees.push(user);
  }

  // Create leave balances
  const allUsers = [admin, hr, ...createdEmployees];
  for (const user of allUsers) {
    await prisma.leaveBalance.upsert({
      where: { employeeId: user.id },
      update: {},
      create: {
        employeeId: user.id,
        annual: 20,
        sick: 10,
        personal: 5,
      },
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('\n📝 Default login credentials:');
  console.log('Admin: admin@dayflow.com / admin123');
  console.log('HR: hr@dayflow.com / hr123');
  console.log('Employee: employee@dayflow.com / employee123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

