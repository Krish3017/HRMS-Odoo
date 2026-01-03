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
  Legend,
  ComposedChart,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isHROrAdmin = user?.role === 'hr' || user?.role === 'admin';

  const pendingLeaves = mockLeaveRequests.filter(l => l.status === 'pending');
  const todayAttendance = mockAttendance.find(a => a.employeeId === user?.employeeId);

  // Professional color scheme that works in both light and dark modes
  const getChartColors = () => {
    const isDark = theme === 'dark';
    return {
      present: isDark ? '#4ade80' : '#22c55e',      // Green
      absent: isDark ? '#f87171' : '#ef4444',       // Red
      leave: isDark ? '#60a5fa' : '#3b82f6',        // Blue
      late: isDark ? '#fbbf24' : '#f59e0b',         // Amber
      primary: isDark ? '#818cf8' : '#6366f1',      // Indigo
      secondary: isDark ? '#a78bfa' : '#8b5cf6',    // Purple
      accent: isDark ? '#34d399' : '#10b981',       // Emerald
      warning: isDark ? '#fb923c' : '#f97316',      // Orange
    };
  };

  const colors = getChartColors();

  // Chart data for HR/Admin
  const weeklyAttendanceData = [
    { name: 'Mon', present: 45, absent: 3, leave: 2, late: 2 },
    { name: 'Tue', present: 42, absent: 5, leave: 3, late: 1 },
    { name: 'Wed', present: 48, absent: 1, leave: 1, late: 0 },
    { name: 'Thu', present: 44, absent: 4, leave: 2, late: 3 },
    { name: 'Fri', present: 40, absent: 6, leave: 4, late: 2 },
    { name: 'Sat', present: 20, absent: 1, leave: 0, late: 0 },
    { name: 'Sun', present: 15, absent: 0, leave: 0, late: 0 },
  ];

  const leaveTypeDistribution = [
    { name: 'Annual', value: 45, color: colors.leave },
    { name: 'Sick', value: 25, color: colors.absent },
    { name: 'Personal', value: 20, color: colors.late },
    { name: 'Unpaid', value: 10, color: colors.secondary },
  ];

  // Department performance for radar chart
  const departmentPerformanceData = [
    { subject: 'Attendance', Engineering: 94, Sales: 89, Marketing: 92, Finance: 96, HR: 93, Operations: 90 },
    { subject: 'Productivity', Engineering: 92, Sales: 95, Marketing: 88, Finance: 90, HR: 85, Operations: 87 },
    { subject: 'Satisfaction', Engineering: 88, Sales: 85, Marketing: 90, Finance: 87, HR: 92, Operations: 83 },
    { subject: 'Efficiency', Engineering: 90, Sales: 93, Marketing: 86, Finance: 94, HR: 88, Operations: 85 },
    { subject: 'Growth', Engineering: 87, Sales: 91, Marketing: 89, Finance: 88, HR: 90, Operations: 82 },
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
    { name: 'Present', value: 6, color: colors.present },
    { name: 'Absent', value: 1, color: colors.absent },
    { name: 'Leave', value: 1, color: colors.leave },
    { name: 'Half Day', value: 0, color: colors.late },
  ];

  // Monthly attendance trend with X-axis padding
  const monthlyAttendanceData = [
    { month: 'Aug', present: 1200, absent: 80, leave: 50, rate: 89.5 },
    { month: 'Sep', present: 1250, absent: 75, leave: 45, rate: 91.2 },
    { month: 'Oct', present: 1300, absent: 70, leave: 40, rate: 92.1 },
    { month: 'Nov', present: 1280, absent: 85, leave: 55, rate: 90.1 },
    { month: 'Dec', present: 1100, absent: 100, leave: 60, rate: 87.3 },
    { month: 'Jan', present: 1350, absent: 65, leave: 35, rate: 93.0 },
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
          {/* Custom Shape Bar Chart - Weekly Attendance */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Weekly Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyAttendanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      stroke="hsl(var(--border))"
                    />
                    <YAxis 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      stroke="hsl(var(--border))"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        color: 'hsl(var(--foreground))',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '10px' }}
                      iconType="circle"
                    />
                    <Bar 
                      dataKey="present" 
                      fill={colors.present} 
                      name="Present" 
                      shape={(props: any) => {
                        const { x, y, width, height } = props;
                        return (
                          <path
                            d={`M${x},${y + height} L${x},${y + height * 0.3} Q${x},${y} ${x + width * 0.5},${y} L${x + width * 0.5},${y} Q${x + width},${y} ${x + width},${y + height * 0.3} L${x + width},${y + height} Z`}
                            fill={colors.present}
                            opacity={0.9}
                          />
                        );
                      }}
                    />
                    <Bar 
                      dataKey="absent" 
                      fill={colors.absent} 
                      name="Absent"
                      shape={(props: any) => {
                        const { x, y, width, height } = props;
                        return (
                          <path
                            d={`M${x},${y + height} L${x},${y + height * 0.3} Q${x},${y} ${x + width * 0.5},${y} L${x + width * 0.5},${y} Q${x + width},${y} ${x + width},${y + height * 0.3} L${x + width},${y + height} Z`}
                            fill={colors.absent}
                            opacity={0.9}
                          />
                        );
                      }}
                    />
                    <Bar 
                      dataKey="leave" 
                      fill={colors.leave} 
                      name="Leave"
                      shape={(props: any) => {
                        const { x, y, width, height } = props;
                        return (
                          <path
                            d={`M${x},${y + height} L${x},${y + height * 0.3} Q${x},${y} ${x + width * 0.5},${y} L${x + width * 0.5},${y} Q${x + width},${y} ${x + width},${y + height * 0.3} L${x + width},${y + height} Z`}
                            fill={colors.leave}
                            opacity={0.9}
                          />
                        );
                      }}
                    />
                    <Bar 
                      dataKey="late" 
                      fill={colors.late} 
                      name="Late"
                      shape={(props: any) => {
                        const { x, y, width, height } = props;
                        return (
                          <path
                            d={`M${x},${y + height} L${x},${y + height * 0.3} Q${x},${y} ${x + width * 0.5},${y} L${x + width * 0.5},${y} Q${x + width},${y} ${x + width},${y + height * 0.3} L${x + width},${y + height} Z`}
                            fill={colors.late}
                            opacity={0.9}
                          />
                        );
                      }}
                    />
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

          {/* Simple Radar Chart - Department Performance */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={departmentPerformanceData}>
                    <PolarGrid stroke="hsl(var(--border))" opacity={0.3} />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    />
                    <Radar 
                      name="Engineering" 
                      dataKey="Engineering" 
                      stroke={colors.primary} 
                      fill={colors.primary} 
                      fillOpacity={0.6}
                    />
                    <Radar 
                      name="Sales" 
                      dataKey="Sales" 
                      stroke={colors.accent} 
                      fill={colors.accent} 
                      fillOpacity={0.6}
                    />
                    <Radar 
                      name="Marketing" 
                      dataKey="Marketing" 
                      stroke={colors.leave} 
                      fill={colors.leave} 
                      fillOpacity={0.6}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        color: 'hsl(var(--foreground))',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '10px' }}
                      iconType="circle"
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Employee Charts - Line Chart with X-axis Padding */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">My Weekly Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={myAttendanceTrend} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <defs>
                      <linearGradient id="colorHoursGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                    <XAxis 
                      dataKey="week" 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      stroke="hsl(var(--border))"
                      padding={{ left: 30, right: 30 }}
                    />
                    <YAxis 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      stroke="hsl(var(--border))"
                      domain={[35, 45]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        color: 'hsl(var(--foreground))',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hours" 
                      stroke={colors.primary} 
                      strokeWidth={2}
                      fill="url(#colorHoursGrad)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hours" 
                      stroke={colors.primary} 
                      strokeWidth={3}
                      dot={{ fill: colors.primary, r: 5, strokeWidth: 2, stroke: 'hsl(var(--card))' }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Leave Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Annual', used: 5, remaining: 15 },
                    { name: 'Sick', used: 2, remaining: 8 },
                    { name: 'Personal', used: 1, remaining: 4 },
                  ]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      stroke="hsl(var(--border))"
                    />
                    <YAxis 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      stroke="hsl(var(--border))"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        color: 'hsl(var(--foreground))',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '10px' }}
                      iconType="circle"
                    />
                    <Bar 
                      dataKey="used" 
                      fill={colors.absent} 
                      name="Used" 
                      shape={(props: any) => {
                        const { x, y, width, height } = props;
                        return (
                          <path
                            d={`M${x},${y + height} L${x},${y + height * 0.2} Q${x},${y} ${x + width * 0.5},${y} L${x + width * 0.5},${y} Q${x + width},${y} ${x + width},${y + height * 0.2} L${x + width},${y + height} Z`}
                            fill={colors.absent}
                            opacity={0.9}
                          />
                        );
                      }}
                    />
                    <Bar 
                      dataKey="remaining" 
                      fill={colors.present} 
                      name="Remaining"
                      shape={(props: any) => {
                        const { x, y, width, height } = props;
                        return (
                          <path
                            d={`M${x},${y + height} L${x},${y + height * 0.2} Q${x},${y} ${x + width * 0.5},${y} L${x + width * 0.5},${y} Q${x + width},${y} ${x + width},${y + height * 0.2} L${x + width},${y + height} Z`}
                            fill={colors.present}
                            opacity={0.9}
                          />
                        );
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Line Bar Area Composed Chart - Monthly Attendance Trend with X-axis Padding */}
      {isHROrAdmin && (
        <Card className="mb-6 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Monthly Attendance Analysis (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyAttendanceData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <defs>
                    <linearGradient id="colorPresentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.present} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={colors.present} stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorAbsentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.absent} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={colors.absent} stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorLeaveGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.leave} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={colors.leave} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    stroke="hsl(var(--border))"
                    padding={{ left: 20, right: 20 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    stroke="hsl(var(--border))"
                    label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    stroke="hsl(var(--border))"
                    domain={[85, 95]}
                    label={{ value: 'Rate (%)', angle: 90, position: 'insideRight', fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                      color: 'hsl(var(--foreground))',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '10px' }}
                    iconType="circle"
                  />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="present" 
                    stackId="1" 
                    stroke={colors.present} 
                    fill="url(#colorPresentGrad)" 
                    name="Present"
                  />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="absent" 
                    stackId="1" 
                    stroke={colors.absent} 
                    fill="url(#colorAbsentGrad)" 
                    name="Absent"
                  />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="leave" 
                    stackId="1" 
                    stroke={colors.leave} 
                    fill="url(#colorLeaveGrad)" 
                    name="Leave"
                  />
                  <Bar yAxisId="left" dataKey="present" fill={colors.present} name="Present Count" opacity={0.3} />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="rate" 
                    stroke={colors.primary} 
                    strokeWidth={3}
                    dot={{ fill: colors.primary, r: 5, strokeWidth: 2, stroke: 'hsl(var(--card))' }}
                    activeDot={{ r: 7 }}
                    name="Attendance Rate %"
                  />
                </ComposedChart>
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
