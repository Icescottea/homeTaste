// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@hometaste.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@hometaste.com',
      password: hashedPassword,
      role: 'ADMIN',
      address: 'Head Office',
      contact: '+1234567890',
    },
  });

  console.log('Admin user created:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });