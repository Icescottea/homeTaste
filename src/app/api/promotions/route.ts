// src/app/api/promotions/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all promotions
export async function GET() {
  try {
    const promotions = await prisma.promotion.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(promotions);
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch promotions' },
      { status: 500 }
    );
  }
}

// CREATE promotion
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, code, discount, startDate, endDate } = body;

    if (!name || !code || !discount || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if code already exists
    const existingPromo = await prisma.promotion.findUnique({
      where: { code },
    });

    if (existingPromo) {
      return NextResponse.json(
        { error: 'Promotion code already exists' },
        { status: 400 }
      );
    }

    // Determine status based on dates
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    let status = 'ACTIVE';
    if (start > now) {
      status = 'SCHEDULED';
    } else if (end < now) {
      status = 'EXPIRED';
    }

    const promotion = await prisma.promotion.create({
      data: {
        name,
        code: code.toUpperCase(),
        discount: parseInt(discount),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
      },
    });

    return NextResponse.json(promotion, { status: 201 });
  } catch (error) {
    console.error('Error creating promotion:', error);
    return NextResponse.json(
      { error: 'Failed to create promotion' },
      { status: 500 }
    );
  }
}