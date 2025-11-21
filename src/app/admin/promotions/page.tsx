// src/app/admin/promotions/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Percent } from 'lucide-react';

export default function PromotionsPage() {
  const promotions = [
    {
      id: 1,
      name: 'Summer Sale',
      discount: 20,
      code: 'SUMMER20',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      status: 'active',
    },
    {
      id: 2,
      name: 'New Customer Discount',
      discount: 15,
      code: 'WELCOME15',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
    },
    {
      id: 3,
      name: 'Holiday Special',
      discount: 25,
      code: 'HOLIDAY25',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      status: 'scheduled',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Promotions</h1>
          <p className="text-gray-600 mt-2">Manage discounts and promotional codes</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Promotion
        </Button>
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <Card key={promo.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{promo.name}</CardTitle>
                  <div className="flex items-center mt-2">
                    <Percent className="w-4 h-4 text-orange-600 mr-1" />
                    <span className="text-2xl font-bold text-orange-600">{promo.discount}%</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    promo.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {promo.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-xs text-gray-600">Promo Code</p>
                <p className="font-mono font-bold text-lg">{promo.code}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Valid Period</p>
                <p className="text-sm">
                  {promo.startDate} to {promo.endDate}
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}