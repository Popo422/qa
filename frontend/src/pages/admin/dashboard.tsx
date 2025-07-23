import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Users, Package, DollarSign } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      description: '+20.1% from last month',
      icon: DollarSign,
    },
    {
      title: 'Users',
      value: '2,350',
      description: '+180.1% from last month',
      icon: Users,
    },
    {
      title: 'Sales',
      value: '12,234',
      description: '+19% from last month',
      icon: BarChart3,
    },
    {
      title: 'Active Products',
      value: '573',
      description: '+201 since last hour',
      icon: Package,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Here's what's happening with your business today.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-80 flex items-center justify-center text-muted-foreground">
              Chart placeholder - Add your preferred chart library
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Customer {i}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      customer{i}@example.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    +$1,999.00
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}