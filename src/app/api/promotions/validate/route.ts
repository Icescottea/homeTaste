// src/app/api/promotions/validate/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Promo code is required' },
        { status: 400 }
      );
    }

    // Find promotion by code
    const promotion = await prisma.promotion.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!promotion) {
      return NextResponse.json(
        { error: 'Invalid promo code' },
        { status: 404 }
      );
    }

    // Check if promotion is active
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);

    if (now < startDate) {
      return NextResponse.json(
        { error: 'This promotion has not started yet' },
        { status: 400 }
      );
    }

    if (now > endDate) {
      return NextResponse.json(
        { error: 'This promotion has expired' },
        { status: 400 }
      );
    }

    if (promotion.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'This promotion is not active' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      discount: promotion.discount,
      code: promotion.code,
      name: promotion.name,
    });
  } catch (error) {
    console.error('Error validating promo code:', error);
    return NextResponse.json(
      { error: 'Failed to validate promo code' },
      { status: 500 }
    );
  }
}