// src/components/CheckoutForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get user
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        throw new Error('User not found');
      }
      const user = JSON.parse(userStr);

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
        },
        redirect: 'if_required',
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Create order in database
        const orderRes = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            cartItems: cartItems.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
            totalAmount: cartTotal,
            stripePaymentIntentId: paymentIntent.id,
          }),
        });

        if (!orderRes.ok) {
          throw new Error('Failed to create order');
        }

        const order = await orderRes.json();

        // Send confirmation email
        try {
          await fetch('/api/send-order-confirmation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: order.id,
              userEmail: user.email,
              userName: user.name,
              orderNumber: order.orderNumber,
              totalAmount: cartTotal,
              items: cartItems,
            }),
          });
        } catch (emailError) {
          // Email failed but order succeeded - that's okay
          console.warn('Email sending failed:', emailError);
        }

        // Clear cart
        await clearCart();

        // Redirect to confirmation page
        router.push(`/order-confirmation?orderId=${order.id}`);
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <PaymentElement />

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg font-semibold"
      >
        {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Your payment is secured with 256-bit SSL encryption
      </p>
    </form>
  );
}