// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  // Seed Promotions
  const promotions = [
    {
      name: 'Summer Sale',
      code: 'SUMMER20',
      discount: 20,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31'),
      status: 'ACTIVE',
    },
    {
      name: 'New Customer Discount',
      code: 'WELCOME15',
      discount: 15,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'ACTIVE',
    },
    {
      name: 'Holiday Special',
      code: 'HOLIDAY25',
      discount: 25,
      startDate: new Date('2024-12-01'),
      endDate: new Date('2024-12-31'),
      status: 'SCHEDULED',
    },
  ];

  for (const promo of promotions) {
    await prisma.promotion.upsert({
      where: { code: promo.code },
      update: {},
      create: promo,
    });
  }

  console.log('Promotions seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });