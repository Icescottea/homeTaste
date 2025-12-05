// src/components/PromotionForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface PromotionFormProps {
  promotionId?: string;
  onClose: () => void;
  onSuccess: () => void;
}

interface PromotionData {
  name: string;
  code: string;
  discount: string;
  startDate: string;
  endDate: string;
}

export default function PromotionForm({ promotionId, onClose, onSuccess }: PromotionFormProps) {
  const [formData, setFormData] = useState<PromotionData>({
    name: '',
    code: '',
    discount: '',
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    if (promotionId) {
      fetchPromotion();
    }
  }, [promotionId]);

  const fetchPromotion = async () => {
    setFetchLoading(true);
    try {
      const res = await fetch(`/api/promotions/${promotionId}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch promotion');
      }
      
      const data = await res.json();
      
      setFormData({
        name: data.name || '',
        code: data.code || '',
        discount: data.discount?.toString() || '',
        startDate: data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '',
        endDate: data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '',
      });
    } catch (error) {
      console.error('Error fetching promotion:', error);
      setError('Failed to load promotion');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Auto-uppercase code
    if (name === 'code') {
      setFormData({
        ...formData,
        [name]: value.toUpperCase(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (parseInt(formData.discount) < 1 || parseInt(formData.discount) > 100) {
      setError('Discount must be between 1 and 100');
      setLoading(false);
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError('End date must be after start date');
      setLoading(false);
      return;
    }

    try {
      const url = promotionId ? `/api/promotions/${promotionId}` : '/api/promotions';
      const method = promotionId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save promotion');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="loader">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {promotionId ? 'Edit Promotion' : 'Create New Promotion'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Promotion Name *</Label>
            <Input
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Summer Sale"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Promo Code *</Label>
            <Input
              id="code"
              name="code"
              required
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g., SUMMER20"
              maxLength={20}
              className="uppercase"
            />
            <p className="text-xs text-gray-500">
              Code will be automatically converted to uppercase
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount">Discount Percentage (%) *</Label>
            <Input
              id="discount"
              name="discount"
              type="number"
              min="1"
              max="100"
              required
              value={formData.discount}
              onChange={handleChange}
              placeholder="20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                required
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                required
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
            >
              {loading ? 'Saving...' : promotionId ? 'Update Promotion' : 'Create Promotion'}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}