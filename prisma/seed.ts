// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.promotion.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Cleared existing data');

  // Seed Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@hometaste.com',
      password: hashedPassword,
      role: 'ADMIN',
      address: 'Head Office, Kandy',
      contact: '+94771234567',
    },
  });

  console.log('✅ Admin user created');

  // Seed Products
  const products = [
    {
      name: 'Turmeric Powder',
      description: 'Premium quality organic turmeric powder sourced from the finest farms. Rich in curcumin with anti-inflammatory properties.',
      price: 12.99,
      image: '/img/tumericPowder.png',
      stock: 45,
    },
    {
      name: 'Chilli Powder',
      description: 'Vibrant red Kashmiri chili powder adds color and mild heat to your dishes. Perfect for Indian cuisine.',
      price: 9.99,
      image: '/img/chilliPowder.png',
      stock: 38,
    },
    {
      name: 'Curry Powder',
      description: 'Traditional Indian spice blend with cinnamon, cardamom, cloves, and more. Aromatic and flavorful.',
      price: 14.99,
      image: '/img/curryPowder.png',
      stock: 32,
    },
    {
      name: 'Chilli Flakes',
      description: 'Whole cumin seeds with earthy, nutty flavor. Essential for tempering and seasoning.',
      price: 8.99,
      image: '/img/chilliFlakes.png',
      stock: 28,
    },
    {
      name: 'Black Pepper',
      description: 'Premium whole black peppercorns. Freshly ground for maximum flavor and aroma.',
      price: 11.99,
      image: '/img/blackPepper.png',
      stock: 52,
    },
    {
      name: 'Coriander Powder',
      description: 'Ground coriander with sweet, citrusy notes. A staple in Indian and Middle Eastern cooking.',
      price: 7.99,
      image: 'https://images.unsplash.com/photo-1596040033229-a0b30c3d0dea?w=400&h=400&fit=crop',
      stock: 41,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('✅ Products seeded successfully');

  // Seed Promotions
  const promotions = [
    {
      name: 'Welcome Discount',
      code: 'WELCOME15',
      discount: 15,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-12-31'),
      status: 'ACTIVE',
    },
    {
      name: 'Summer Sale',
      code: 'SUMMER20',
      discount: 20,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2025-08-31'),
      status: 'ACTIVE',
    },
    {
      name: 'Mega Sale',
      code: 'MEGA25',
      discount: 25,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-12-31'),
      status: 'ACTIVE',
    },
  ];

  for (const promo of promotions) {
    await prisma.promotion.create({ data: promo });
  }

  console.log('✅ Promotions seeded successfully');
  console.log('\n=================================');
  console.log('Demo Data Seeded Successfully!');
  console.log('=================================');
  console.log('\nAdmin Login:');
  console.log('Email: admin@hometaste.com');
  console.log('Password: admin123');
  console.log('\nPromo Codes:');
  console.log('- WELCOME15 (15% off)');
  console.log('- SUMMER20 (20% off)');
  console.log('- MEGA25 (25% off)');
  console.log('=================================\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });