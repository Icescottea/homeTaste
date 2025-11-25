// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  
  await prisma.product.deleteMany({});

  const products = [
    {
      name: 'Turmeric Powder',
      description: 'Premium quality organic turmeric powder sourced from the finest farms. Rich in curcumin with anti-inflammatory properties.',
      price: 12.99,
      image: '/img/turmericPowder.png',
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
  ];

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });
  
  console.log('Products seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });