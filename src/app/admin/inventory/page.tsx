// src/app/admin/inventory/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 1, name: 'Organic Turmeric Powder', sku: 'SP1001', stock: 45, price: 12.99 },
    { id: 2, name: 'Kashmiri Red Chili', sku: 'SP1002', stock: 8, price: 9.99 },
    { id: 3, name: 'Garam Masala Blend', sku: 'SP1003', stock: 32, price: 14.99 },
    { id: 4, name: 'Cumin Seeds Premium', sku: 'SP1004', stock: 5, price: 8.99 },
    { id: 5, name: 'Black Pepper Whole', sku: 'SP1005', stock: 28, price: 11.99 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-2">Manage your product inventory</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Product Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">SKU</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">{product.name}</td>
                    <td className="py-4 px-4 text-gray-600">{product.sku}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          product.stock < 10
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium">${product.price}</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}