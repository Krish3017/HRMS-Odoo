import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { mockDashboardStats, mockAttendance, mockLeaveRequests, mockEmployees } from '@/data/mockData';
import { Users, UserCheck, CalendarDays, ClipboardList, Clock, LogIn, LogOut, FileText, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line,
  AreaChart,
  Area,
  Legend
} from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isHROrAdmin = user?.role === 'hr' || user?.role === 'admin';

  const pendingLeaves = mockLeaveRequests.filter(l => l.status === 'pending');
  const todayAttendance = mockAttendance.find(a => a.employeeId === user?.employeeId);

  // Chart data for HR/Admin
  const weeklyAttendanceData = [
    { name: 'Mon', present: 45, absent: 3, leave: 2 },
    { name: 'Tue', present: 42, absent: 5, leave: 3 },
    { name: 'Wed', present: 48, absent: 1, leave: 1 },
    { name: 'Thu', present: 44, absent: 4, leave: 2 },
    { name: 'Fri', present: 40, absent: 6, leave: 4 },
    { name: 'Sat', present: 20, absent: 1, leave: 0 },
    { name: 'Sun', present: 15, absent: 0, leave: 0 },
  ];

  const leaveTypeDistribution = [
    { name: 'Annual', value: 45, color: 'hsl(217, 91%, 60%)' },
    { name: 'Sick', value: 25, color: 'hsl(0, 84%, 60%)' },
    { name: 'Personal', value: 20, color: 'hsl(45, 93%, 47%)' },
    { name: 'Unpaid', value: 10, color: 'hsl(215, 16%, 47%)' },
  ];

  // Employee distribution by department
  const departmentData = mockEmployees.reduce((acc, emp) => {
    const dept = emp.department || 'Other';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentChartData = Object.entries(departmentData).map(([name, value]) => ({
    name,
    employees: value,
  }));

  // Attendance status breakdown
  const attendanceStatusData = [
    { name: 'Present', value: 6, color: 'hsl(142, 76%, 36%)' },
    { name: 'Absent', value: 1, color: 'hsl(0, 84%, 60%)' },
    { name: 'Leave', value: 1, color: 'hsl(217, 91%, 60%)' },
    { name: 'Half Day', value: 0, color: 'hsl(45, 93%, 47%)' },
  ];

  // Monthly attendance trend
  const monthlyAttendanceData = [
    { month: 'Aug', present: 1200, absent: 80, leave: 50 },
    { month: 'Sep', present: 1250, absent: 75, leave: 45 },
    { month: 'Oct', present: 1300, absent: 70, leave: 40 },
    { month: 'Nov', present: 1280, absent: 85, leave: 55 },
    { month: 'Dec', present: 1100, absent: 100, leave: 60 },
    { month: 'Jan', present: 1350, absent: 65, leave: 35 },
  ];

  // Employee attendance trend (for employees)
  const myAttendanceTrend = [
    { week: 'Week 1', hours: 40 },
    { week: 'Week 2', hours: 38 },
    { week: 'Week 3', hours: 42 },
    { week: 'Week 4', hours: 40 },
  ];

  return (
    <ERPLayout>
      <PageHeader 
        title={`Welcome back, ${user?.firstName}`}
        description={isHROrAdmin 
          ? 'HR Dashboard - Manage employees, attendance, and approvals' 
          : 'Employee Dashboard - View your attendance, leave, and payroll'}
        actions={
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        }
      />

      {/* Stats Grid */}
      {isHROrAdmin ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Employees"
            value={mockDashboardStats.totalEmployees}
            icon={Users}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Present Today"
            value={mockDashboardStats.presentToday}
            icon={UserCheck}
            description={`${Math.round((mockDashboardStats.presentToday / mockDashboardStats.totalEmployees) * 100)}% attendance`}
          />
          <StatCard
            title="On Leave"
            value={mockDashboardStats.onLeave}
            icon={CalendarDays}
          />
          <StatCard
            title="Pending Approvals"
            value={mockDashboardStats.pendingApprovals}
            icon={ClipboardList}
          />
        </div>
      ) : (
        // Employee quick stats
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {todayAttendance ? (
                    <StatusBadge status={todayAttendance.status} />
                  ) : (
                    <span className="text-sm text-muted-foreground">Not checked in</span>
                  )}
                </div>
                {todayAttendance?.checkIn && (
                  <div className="text-sm text-muted-foreground">
                    {todayAttendance.checkIn} - {todayAttendance.checkOut || 'Active'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Leave Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-2xl font-semibold">15</p>
                  <p className="text-xs text-muted-foreground">Annual</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">8</p>
                  <p className="text-xs text-muted-foreground">Sick</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">4</p>
                  <p className="text-xs text-muted-foreground">Personal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">$6,400</p>
              <p className="text-xs text-muted-foreground">Net Pay - January 2024</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions - Employee */}
      {!isHROrAdmin && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h2>
          <div className="flex gap-3">
            <Button variant="outline" className="h-auto py-3 px-4">
              <LogIn className="h-4 w-4 mr-2" />
              Check In
            </Button>
            <Button variant="outline" className="h-auto py-3 px-4">
              <LogOut className="h-4 w-4 mr-2" />
              Check Out
            </Button>
            <Button variant="outline" className="h-auto py-3 px-4">
              <CalendarDays className="h-4 w-4 mr-2" />
              Apply Leave
            </Button>
            <Button variant="outline" className="h-auto py-3 px-4">
              <FileText className="h-4 w-4 mr-2" />
              View Payslip
            </Button>
          </div>
        </div>
      )}

      {/* Charts Section */}
      {isHROrAdmin ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Weekly Attendance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Weekly Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                    <XAxis 
                      dataKey="name" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.375rem',
                        color: 'hsl(var(--foreground))',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="present" fill="hsl(142, 76%, 36%)" name="Present" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="absent" fill="hsl(0, 84%, 60%)" name="Absent" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="leave" fill="hsl(217, 91%, 60%)" name="Leave" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Leave Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Leave Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leaveTypeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {leaveTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.375rem',
                        color: 'hsl(var(--foreground))',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3 min-w-32 ml-4">
                  {leaveTypeDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-foreground">{item.name}</span>
                      <span className="text-sm text-muted-foreground ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee Distribution by Department */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Employees by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                    <XAxis 
                      type="number"
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category"
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      width={100}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.375rem',
                        color: 'hsl(var(--foreground))',
                      }}
                    />
                    <Bar dataKey="employees" fill="hsl(221, 83%, 53%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Status Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Today's Attendance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {attendanceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.375rem',
                        color: 'hsl(var(--foreground))',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Employee Charts */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">My Weekly Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={myAttendanceTrend}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                    <XAxis 
                      dataKey="week" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.375rem',
                        color: 'hsl(var(--foreground))',
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="hsl(221, 83%, 53%)" 
                      fillOpacity={1} 
                      fill="url(#colorHours)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Leave Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Annual', used: 5, remaining: 15 },
                    { name: 'Sick', used: 2, remaining: 8 },
                    { name: 'Personal', used: 1, remaining: 4 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                    <XAxis 
                      dataKey="name" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.375rem',
                        color: 'hsl(var(--foreground))',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="used" fill="hsl(0, 84%, 60%)" name="Used" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="remaining" fill="hsl(142, 76%, 36%)" name="Remaining" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Monthly Attendance Trend - Full Width for HR/Admin */}
      {isHROrAdmin && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base font-medium">Monthly Attendance Trend (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyAttendanceData}>
                  <defs>
                    <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLeave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.375rem',
                      color: 'hsl(var(--foreground))',
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="present" 
                    stackId="1" 
                    stroke="hsl(142, 76%, 36%)" 
                    fill="url(#colorPresent)" 
                    name="Present"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="absent" 
                    stackId="1" 
                    stroke="hsl(0, 84%, 60%)" 
                    fill="url(#colorAbsent)" 
                    name="Absent"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="leave" 
                    stackId="1" 
                    stroke="hsl(217, 91%, 60%)" 
                    fill="url(#colorLeave)" 
                    name="Leave"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Attendance / My Recent Attendance */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base font-medium">
              {isHROrAdmin ? "Today's Attendance" : "My Recent Attendance"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="erp-table">
              <thead>
                <tr>
                  {isHROrAdmin && <th>Employee</th>}
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {(isHROrAdmin ? mockAttendance.slice(0, 5) : mockAttendance.slice(0, 5)).map((record) => (
                  <tr key={record.id}>
                    {isHROrAdmin && <td className="font-medium">{record.employeeName}</td>}
                    <td>{record.date}</td>
                    <td>{record.checkIn || '-'}</td>
                    <td>{record.checkOut || '-'}</td>
                    <td><StatusBadge status={record.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Pending Approvals (HR/Admin) or My Leave Requests (Employee) */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base font-medium">
              {isHROrAdmin ? 'Pending Leave Approvals' : 'My Leave Requests'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isHROrAdmin ? (
              pendingLeaves.length > 0 ? (
                <table className="erp-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Type</th>
                      <th>Duration</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingLeaves.map((leave) => (
                      <tr key={leave.id}>
                        <td className="font-medium">{leave.employeeName}</td>
                        <td className="capitalize">{leave.leaveType}</td>
                        <td>{leave.days} day(s)</td>
                        <td>
                          <div className="flex gap-2">
                            <Button size="sm" variant="default" className="h-7 text-xs">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  No pending approvals
                </div>
              )
            ) : (
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeaveRequests.slice(0, 3).map((leave) => (
                    <tr key={leave.id}>
                      <td className="capitalize">{leave.leaveType}</td>
                      <td>{leave.startDate}</td>
                      <td>{leave.endDate}</td>
                      <td><StatusBadge status={leave.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  );
}
