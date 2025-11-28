
// src/app/api/dashboard/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get total products count
    const totalProducts = await prisma.product.count();

    // Get total orders count
    const totalOrders = await prisma.order.count();

    // Get total customers count (users with CUSTOMER role)
    const totalCustomers = await prisma.user.count({
      where: { role: 'CUSTOMER' },
    });

    // Get total revenue (sum of all completed orders)
    const revenueData = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: {
          in: ['COMPLETED', 'PROCESSING', 'PENDING'],
        },
      },
    });
    const totalRevenue = revenueData._sum.totalAmount || 0;

    // Get recent orders (last 5)
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Get low stock products (stock < 20)
    const lowStockProducts = await prisma.product.findMany({
      where: {
        stock: {
          lt: 20,
        },
      },
      orderBy: {
        stock: 'asc',
      },
      take: 5,
    });

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue,
      recentOrders,
      lowStockProducts,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}