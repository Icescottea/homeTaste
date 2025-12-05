// src/app/my-orders/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle, XCircle, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: {
    id: string;
    quantity: number;
    priceAtPurchase: number;
    product: {
      name: string;
      image: string;
    };
  }[];
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role !== 'CUSTOMER') {
      router.push('/');
      return;
    }

    fetchOrders(user.id);
  }, []);

  const fetchOrders = async (userId: string) => {
    try {
      const res = await fetch(`/api/orders?userId=${userId}`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'PROCESSING':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'CANCELLED':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'COMPLETED':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Order Placed';
      case 'PROCESSING':
        return 'Being Prepared';
      case 'COMPLETED':
        return 'Delivered';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No orders yet</h2>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders. Start shopping to see your orders here!
              </p>
              <Link href="/">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg mb-1">Order #{order.orderNumber}</CardTitle>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="font-semibold">{getStatusText(order.status)}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{item.product.name}</h4>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {order.items.length > 3 && (
                        <p className="text-sm text-gray-600 pl-20">
                          + {order.items.length - 3} more item(s)
                        </p>
                      )}
                    </div>

                    {/* Order Summary */}
                    <div className="border-t pt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold text-orange-600">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedOrder(order)}
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    </div>

                    {/* Order Status Timeline */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-2 ${
                          ['PENDING', 'PROCESSING', 'COMPLETED'].includes(order.status)
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            ['PENDING', 'PROCESSING', 'COMPLETED'].includes(order.status)
                              ? 'bg-green-100'
                              : 'bg-gray-100'
                          }`}>
                            <CheckCircle className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-medium">Ordered</span>
                        </div>
                        
                        <div className={`flex-1 h-1 mx-2 ${
                          ['PROCESSING', 'COMPLETED'].includes(order.status)
                            ? 'bg-green-600'
                            : 'bg-gray-300'
                        }`}></div>
                        
                        <div className={`flex items-center gap-2 ${
                          ['PROCESSING', 'COMPLETED'].includes(order.status)
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            ['PROCESSING', 'COMPLETED'].includes(order.status)
                              ? 'bg-green-100'
                              : 'bg-gray-100'
                          }`}>
                            <Package className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-medium">Processing</span>
                        </div>
                        
                        <div className={`flex-1 h-1 mx-2 ${
                          order.status === 'COMPLETED'
                            ? 'bg-green-600'
                            : 'bg-gray-300'
                        }`}></div>
                        
                        <div className={`flex items-center gap-2 ${
                          order.status === 'COMPLETED'
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            order.status === 'COMPLETED'
                              ? 'bg-green-100'
                              : 'bg-gray-100'
                          }`}>
                            <CheckCircle className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-medium">Delivered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                <p className="text-gray-600">{selectedOrder.orderNumber}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Status */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Status</h3>
                <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border inline-flex ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusIcon(selectedOrder.status)}
                  <span className="font-semibold">{getStatusText(selectedOrder.status)}</span>
                </div>
              </div>

              {/* Order Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  <p><strong>Total Amount:</strong> 
                    <span className="text-orange-600 font-bold ml-2">
                      ${selectedOrder.totalAmount.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Items Ordered</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">
                          Price: ${item.priceAtPurchase.toFixed(2)} each
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <Button
                onClick={() => setSelectedOrder(null)}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}