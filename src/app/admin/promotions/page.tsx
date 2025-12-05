// src/app/admin/promotions/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Percent } from 'lucide-react';
import PromotionForm from '@/components/PromotionForm';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

interface Promotion {
  id: string;
  name: string;
  code: string;
  discount: number;
  startDate: string;
  endDate: string;
  status: string;
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPromotionId, setEditingPromotionId] = useState<string | undefined>();
  const [deletingPromotion, setDeletingPromotion] = useState<Promotion | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const res = await fetch('/api/promotions');
      const data = await res.json();
      setPromotions(data);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPromotion = () => {
    setEditingPromotionId(undefined);
    setShowForm(true);
  };

  const handleEditPromotion = (promotionId: string) => {
    setEditingPromotionId(promotionId);
    setShowForm(true);
  };

  const handleDeletePromotion = async () => {
    if (!deletingPromotion) return;

    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/promotions/${deletingPromotion.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete promotion');
      }

      await fetchPromotions();
      setDeletingPromotion(null);
    } catch (error) {
      console.error('Error deleting promotion:', error);
      alert('Failed to delete promotion');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleFormSuccess = () => {
    fetchPromotions();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-700';
      case 'SCHEDULED':
        return 'bg-yellow-100 text-yellow-700';
      case 'EXPIRED':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Promotions</h1>
          <p className="text-gray-600 mt-2">Manage discounts and promotional codes</p>
        </div>
        <Button onClick={handleAddPromotion} className="bg-orange-600 hover:bg-orange-700">
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
                  className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(promo.status)}`}
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
                  {new Date(promo.startDate).toLocaleDateString()} to{' '}
                  {new Date(promo.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEditPromotion(promo.id)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => setDeletingPromotion(promo)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {promotions.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Percent className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">No promotions yet</p>
            <p className="text-gray-500 text-sm mb-4">
              Create your first promotion to start offering discounts
            </p>
            <Button onClick={handleAddPromotion} className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Promotion
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Promotion Form Modal */}
      {showForm && (
        <PromotionForm
          promotionId={editingPromotionId}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deletingPromotion && (
        <DeleteConfirmDialog
          productName={deletingPromotion.name}
          onConfirm={handleDeletePromotion}
          onCancel={() => setDeletingPromotion(null)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
}