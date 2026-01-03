import { ERPLayout } from '@/components/layout/ERPLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  RadialBarChart,
  RadialBar,
  ScatterChart,
  Scatter,
  ReferenceLine
} from 'recharts';
import { Download, FileSpreadsheet, FileText, TrendingUp, TrendingDown, Users, Calendar, DollarSign, Clock } from 'lucide-react';
import { mockEmployees } from '@/data/mockData';

// Comprehensive data sets
const weeklyAttendanceData = [
  { name: 'Mon', present: 45, absent: 3, leave: 2, late: 2 },
  { name: 'Tue', present: 42, absent: 5, leave: 3, late: 1 },
  { name: 'Wed', present: 48, absent: 1, leave: 1, late: 0 },
  { name: 'Thu', present: 44, absent: 4, leave: 2, late: 3 },
  { name: 'Fri', present: 40, absent: 6, leave: 4, late: 2 },
  { name: 'Sat', present: 20, absent: 1, leave: 0, late: 0 },
  { name: 'Sun', present: 15, absent: 0, leave: 0, late: 0 },
];

const monthlyAttendanceData = [
  { month: 'Aug', present: 1200, absent: 80, leave: 50, attendanceRate: 89.5 },
  { month: 'Sep', present: 1250, absent: 75, leave: 45, attendanceRate: 91.2 },
  { month: 'Oct', present: 1300, absent: 70, leave: 40, attendanceRate: 92.1 },
  { month: 'Nov', present: 1280, absent: 85, leave: 55, attendanceRate: 90.1 },
  { month: 'Dec', present: 1100, absent: 100, leave: 60, attendanceRate: 87.3 },
  { month: 'Jan', present: 1350, absent: 65, leave: 35, attendanceRate: 93.0 },
];

const leaveDistribution = [
  { name: 'Annual', value: 45, color: 'hsl(217, 91%, 60%)', used: 120, total: 200 },
  { name: 'Sick', value: 25, color: 'hsl(0, 84%, 60%)', used: 45, total: 100 },
  { name: 'Personal', value: 20, color: 'hsl(45, 93%, 47%)', used: 35, total: 80 },
  { name: 'Unpaid', value: 10, color: 'hsl(215, 16%, 47%)', used: 15, total: 50 },
];

const payrollTrend = [
  { month: 'Aug', amount: 125000, employees: 45, avgSalary: 2778 },
  { month: 'Sep', amount: 128000, employees: 46, avgSalary: 2783 },
  { month: 'Oct', amount: 132000, employees: 47, avgSalary: 2809 },
  { month: 'Nov', amount: 130000, employees: 47, avgSalary: 2766 },
  { month: 'Dec', amount: 145000, employees: 48, avgSalary: 3021 },
  { month: 'Jan', amount: 142000, employees: 48, avgSalary: 2958 },
];

const departmentPerformance = [
  { department: 'Engineering', employees: 12, attendance: 94.5, productivity: 92, satisfaction: 88 },
  { department: 'Sales', employees: 8, attendance: 89.2, productivity: 95, satisfaction: 85 },
  { department: 'Marketing', employees: 6, attendance: 91.8, productivity: 88, satisfaction: 90 },
  { department: 'Finance', employees: 5, attendance: 96.2, productivity: 90, satisfaction: 87 },
  { department: 'HR', employees: 4, attendance: 93.5, productivity: 85, satisfaction: 92 },
  { department: 'Operations', employees: 7, attendance: 90.1, productivity: 87, satisfaction: 83 },
];

const employeeTenureData = [
  { range: '0-1 Year', count: 15, percentage: 31 },
  { range: '1-3 Years', count: 18, percentage: 38 },
  { range: '3-5 Years', count: 10, percentage: 21 },
  { range: '5-10 Years', count: 4, percentage: 8 },
  { range: '10+ Years', count: 1, percentage: 2 },
];

const leaveTrendData = [
  { month: 'Aug', approved: 45, rejected: 5, pending: 8 },
  { month: 'Sep', approved: 52, rejected: 3, pending: 6 },
  { month: 'Oct', approved: 48, rejected: 4, pending: 7 },
  { month: 'Nov', approved: 55, rejected: 6, pending: 9 },
  { month: 'Dec', approved: 38, rejected: 2, pending: 5 },
  { month: 'Jan', approved: 42, rejected: 3, pending: 4 },
];

const attendanceByDepartment = [
  { department: 'Engineering', present: 11, absent: 1, leave: 0 },
  { department: 'Sales', present: 7, absent: 0, leave: 1 },
  { department: 'Marketing', present: 5, absent: 0, leave: 1 },
  { department: 'Finance', present: 5, absent: 0, leave: 0 },
  { department: 'HR', present: 4, absent: 0, leave: 0 },
  { department: 'Operations', present: 6, absent: 1, leave: 0 },
];

const radialData = [
  { name: 'Attendance', value: 93, fill: 'hsl(142, 76%, 36%)' },
  { name: 'Productivity', value: 88, fill: 'hsl(221, 83%, 53%)' },
  { name: 'Satisfaction', value: 87, fill: 'hsl(217, 91%, 60%)' },
];

const COLORS = {
  present: 'hsl(142, 76%, 36%)',
  absent: 'hsl(0, 84%, 60%)',
  leave: 'hsl(217, 91%, 60%)',
  late: 'hsl(45, 93%, 47%)',
  primary: 'hsl(221, 83%, 53%)',
};

export default function Reports() {
  const totalEmployees = mockEmployees.length;
  const avgAttendance = monthlyAttendanceData[monthlyAttendanceData.length - 1].attendanceRate;
  const totalPayroll = payrollTrend[payrollTrend.length - 1].amount;
  const pendingLeaves = leaveTrendData[leaveTrendData.length - 1].pending;

  return (
    <ERPLayout>
      <PageHeader 
        title="Reports & Analytics"
        description="Comprehensive HR insights and data-driven decision making"
        actions={
          <div className="flex gap-3">
            <Select defaultValue="january">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="january">January 2024</SelectItem>
                <SelectItem value="december">December 2023</SelectItem>
                <SelectItem value="november">November 2023</SelectItem>
                <SelectItem value="october">October 2023</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Employees</CardDescription>
            <CardTitle className="text-3xl font-bold">{totalEmployees}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1 text-status-present" />
              <span>+5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Attendance Rate</CardDescription>
            <CardTitle className="text-3xl font-bold">{avgAttendance.toFixed(1)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1 text-status-present" />
              <span>+2.1% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Payroll</CardDescription>
            <CardTitle className="text-3xl font-bold">${(totalPayroll / 1000).toFixed(0)}k</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingDown className="h-4 w-4 mr-1 text-status-absent" />
              <span>-2.1% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Leave Requests</CardDescription>
            <CardTitle className="text-3xl font-bold">{pendingLeaves}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingDown className="h-4 w-4 mr-1 text-status-present" />
              <span>-1 from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Export Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="cursor-pointer hover:border-primary/50 transition-all hover:shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-status-present-bg flex items-center justify-center">
                <FileSpreadsheet className="h-6 w-6 text-status-present" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Attendance Report</p>
                <p className="text-sm text-muted-foreground">Monthly attendance summary</p>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-primary/50 transition-all hover:shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-status-leave-bg flex items-center justify-center">
                <FileText className="h-6 w-6 text-status-leave" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Leave Summary</p>
                <p className="text-sm text-muted-foreground">Leave utilization report</p>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-primary/50 transition-all hover:shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-status-half-day-bg flex items-center justify-center">
                <FileSpreadsheet className="h-6 w-6 text-status-half-day" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Payroll Report</p>
                <p className="text-sm text-muted-foreground">Salary disbursement details</p>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different report categories */}
      <Tabs defaultValue="attendance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Attendance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Weekly Attendance Overview</CardTitle>
                <CardDescription>Daily attendance breakdown for the current week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={weeklyAttendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
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
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Legend 
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="circle"
                      />
                      <Bar dataKey="present" fill={COLORS.present} name="Present" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="absent" fill={COLORS.absent} name="Absent" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="leave" fill={COLORS.leave} name="Leave" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="late" fill={COLORS.late} name="Late" radius={[4, 4, 0, 0]} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Attendance Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Monthly Attendance Trend</CardTitle>
                <CardDescription>6-month attendance rate progression</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyAttendanceData}>
                      <defs>
                        <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.present} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={COLORS.present} stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        stroke="hsl(var(--border))"
                      />
                      <YAxis 
                        domain={[85, 95]}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        stroke="hsl(var(--border))"
                        label={{ value: 'Attendance Rate (%)', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                        formatter={(value: number) => [`${value}%`, 'Attendance Rate']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="attendanceRate" 
                        stroke={COLORS.present} 
                        strokeWidth={3}
                        fill="url(#colorAttendance)" 
                      />
                      <ReferenceLine y={90} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" label={{ value: 'Target', position: 'right' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Attendance by Department */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Attendance by Department</CardTitle>
                <CardDescription>Today's attendance breakdown by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceByDepartment} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        type="number"
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        stroke="hsl(var(--border))"
                      />
                      <YAxis 
                        dataKey="department" 
                        type="category"
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        stroke="hsl(var(--border))"
                        width={100}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="present" stackId="a" fill={COLORS.present} name="Present" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="absent" stackId="a" fill={COLORS.absent} name="Absent" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="leave" stackId="a" fill={COLORS.leave} name="Leave" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Department Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Department Performance</CardTitle>
                <CardDescription>Multi-metric performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={departmentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey="department" 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                        stroke="hsl(var(--border))"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis 
                        yAxisId="left"
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        stroke="hsl(var(--border))"
                        label={{ value: 'Percentage', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        stroke="hsl(var(--border))"
                        label={{ value: 'Employees', angle: 90, position: 'insideRight', fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Legend />
                      <Bar yAxisId="right" dataKey="employees" fill={COLORS.primary} name="Employees" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="left" type="monotone" dataKey="attendance" stroke={COLORS.present} strokeWidth={2} name="Attendance %" />
                      <Line yAxisId="left" type="monotone" dataKey="productivity" stroke={COLORS.leave} strokeWidth={2} name="Productivity %" />
                      <Line yAxisId="left" type="monotone" dataKey="satisfaction" stroke={COLORS.late} strokeWidth={2} name="Satisfaction %" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Leave Management Tab */}
        <TabsContent value="leave" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Leave Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Leave Type Distribution</CardTitle>
                <CardDescription>Breakdown of leave types used this year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leaveDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {leaveDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-4 min-w-40 ml-6">
                    {leaveDistribution.map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div 
                            className="h-3 w-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                          <span className="text-sm text-muted-foreground ml-auto">{item.value}%</span>
                        </div>
                        <div className="text-xs text-muted-foreground pl-5">
                          {item.used} / {item.total} days
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leave Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Leave Request Trend</CardTitle>
                <CardDescription>Monthly leave request statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={leaveTrendData}>
                      <defs>
                        <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.present} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={COLORS.present} stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.absent} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={COLORS.absent} stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.late} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={COLORS.late} stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey="month" 
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
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="approved" 
                        stackId="1" 
                        stroke={COLORS.present} 
                        fill="url(#colorApproved)" 
                        name="Approved"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="rejected" 
                        stackId="1" 
                        stroke={COLORS.absent} 
                        fill="url(#colorRejected)" 
                        name="Rejected"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="pending" 
                        stackId="1" 
                        stroke={COLORS.late} 
                        fill="url(#colorPending)" 
                        name="Pending"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payroll Trend */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Payroll Trend Analysis</CardTitle>
                <CardDescription>6-month payroll and average salary trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={payrollTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        stroke="hsl(var(--border))"
                      />
                      <YAxis 
                        yAxisId="left"
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        stroke="hsl(var(--border))"
                        tickFormatter={(value) => `$${(value / 1000)}k`}
                        label={{ value: 'Total Payroll ($)', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        stroke="hsl(var(--border))"
                        label={{ value: 'Avg Salary ($)', angle: 90, position: 'insideRight', fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                        formatter={(value: number, name: string) => {
                          if (name === 'amount') return [`$${value.toLocaleString()}`, 'Total Payroll'];
                          if (name === 'avgSalary') return [`$${value.toLocaleString()}`, 'Avg Salary'];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="amount" fill={COLORS.primary} name="Total Payroll" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="avgSalary" stroke={COLORS.leave} strokeWidth={3} name="Average Salary" dot={{ fill: COLORS.leave, r: 4 }} />
                      <Line yAxisId="left" type="monotone" dataKey="employees" stroke={COLORS.late} strokeWidth={2} strokeDasharray="5 5" name="Employees" dot={{ fill: COLORS.late, r: 3 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Employee Tenure Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Employee Tenure Distribution</CardTitle>
                <CardDescription>Years of service breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={employeeTenureData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey="range" 
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
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                        formatter={(value: number, name: string, props: any) => [
                          `${value} employees (${props.payload.percentage}%)`,
                          'Count'
                        ]}
                      />
                      <Bar dataKey="count" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Overall Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="90%" data={radialData} startAngle={90} endAngle={-270}>
                      <RadialBar 
                        dataKey="value" 
                        cornerRadius={10}
                      >
                        {radialData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </RadialBar>
                      <Legend 
                        iconSize={12}
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        wrapperStyle={{ paddingLeft: '20px' }}
                        payload={radialData.map((entry) => ({
                          value: entry.name,
                          type: 'circle',
                          color: entry.fill,
                        }))}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                        formatter={(value: number) => [`${value}%`, 'Score']}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </ERPLayout>
  );
}
