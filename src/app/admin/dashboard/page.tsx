// src/app/admin/dashboard/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Products',
      value: '48',
      icon: Package,
      change: '+12%',
      changeType: 'positive',
    },
    {
      title: 'Total Orders',
      value: '1,234',
      icon: ShoppingCart,
      change: '+23%',
      changeType: 'positive',
    },
    {
      title: 'Total Customers',
      value: '856',
      icon: Users,
      change: '+8%',
      changeType: 'positive',
    },
    {
      title: 'Revenue',
      value: '$12,456',
      icon: TrendingUp,
      change: '+18%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-sm text-green-600 mt-2">{stat.change} from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">Order #{1000 + i}</p>
                    <p className="text-sm text-gray-600">Customer {i}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(Math.random() * 100 + 20).toFixed(2)}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Turmeric Powder', 'Red Chili', 'Cumin Seeds', 'Black Pepper', 'Coriander'].map(
                (item, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">{item}</p>
                      <p className="text-sm text-gray-600">SKU: SP{1000 + i}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-red-600 font-medium">{Math.floor(Math.random() * 10)} left</p>
                      <p className="text-xs text-gray-600">Restock needed</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}