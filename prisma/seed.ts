import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // USERS
  await prisma.user.createMany({
    data: [
      {
        id: "cmi8m2px90000sa7u79vgpev7",
        name: "Admin",
        email: "admin@hometaste.com",
        password: "$2b$10$9HSE6f4q08xF1RPem8Or4u/0.0NB8jSZg3sw67X8E/15QYa8I2hHy",
        address: "Head Office",
        contact: "+1234567890",
        role: "ADMIN",
        createdAt: new Date("2025-11-21T08:41:40.030Z"),
        updatedAt: new Date("2025-11-21T08:41:40.030Z"),
      },
      {
        id: "cmie5qy1g0000saa9qewooi9d",
        name: "John Doe",
        email: "john@example.com",
        password: "$2b$10$P6XQmViXlZe6MsXSogFKreqVp2/FAtqK3Id3ZSbkpA7k/T7zJukq2",
        address: "123 Main St, City ",
        contact: "+123456789",
        role: "CUSTOMER",
        createdAt: new Date("2025-11-25T05:51:13.877Z"),
        updatedAt: new Date("2025-11-25T05:51:13.877Z"),
      },
    ],
    skipDuplicates: true,
  });

  // PRODUCTS
  await prisma.product.createMany({
    data: [
      {
        id: "cmid5grxu0004saorcjaemn84",
        name: "Black Pepper",
        description: "Premium whole black peppercorns. Freshly ground for maximum flavor and aroma.",
        price: 11.99,
        image: "/img/blackPepper.png",
        stock: 52,
        createdAt: new Date("2025-11-24T12:55:33.234Z"),
        updatedAt: new Date("2025-11-24T12:55:33.234Z"),
      },
      {
        id: "cmid5grxu0000saorbd8a9pym",
        name: "Turmeric Powder",
        description: "Premium quality organic turmeric powder sourced from the finest farms. Rich in curcumin with anti-inflammatory properties.",
        price: 12.99,
        image: "/img/turmericPowder.png",
        stock: 55,
        createdAt: new Date("2025-11-24T12:55:33.234Z"),
        updatedAt: new Date("2025-11-25T04:07:39.717Z"),
      },
      {
        id: "cmid5grxu0001saorapvqr5gn",
        name: "Chilli Powder",
        description: "Vibrant red Kashmiri chili powder adds color and mild heat to your dishes. Perfect for Indian cuisine.",
        price: 9.99,
        image: "/img/chilliPowder.png",
        stock: 36,
        createdAt: new Date("2025-11-24T12:55:33.234Z"),
        updatedAt: new Date("2025-11-27T03:47:43.456Z"),
      },
      {
        id: "cmid5grxu0002saor9cwalfor",
        name: "Curry Powder",
        description: "Traditional Indian spice blend with cinnamon, cardamom, cloves, and more. Aromatic and flavorful.",
        price: 14.99,
        image: "/img/curryPowder.png",
        stock: 30,
        createdAt: new Date("2025-11-24T12:55:33.234Z"),
        updatedAt: new Date("2025-11-27T14:12:30.631Z"),
      },
      {
        id: "cmid5grxu0003saorixmr4x14",
        name: "Chilli Flakes",
        description: "Whole cumin seeds with earthy, nutty flavor. Essential for tempering and seasoning.",
        price: 8.99,
        image: "/img/chilliFlakes.png",
        stock: 24,
        createdAt: new Date("2025-11-24T12:55:33.234Z"),
        updatedAt: new Date("2025-11-27T14:12:30.632Z"),
      },
    ],
    skipDuplicates: true,
  });

  // ORDERS
  await prisma.order.createMany({
    data: [
      {
        id: "cmigw7tf50005saslu05qtwgo",
        userId: "cmie5qy1g0000saa9qewooi9d",
        orderNumber: "ORD-1764215263392-GDJYKFV2V",
        totalAmount: 46.95,
        status: "COMPLETED",
        stripePaymentIntentId: "pi_3SXw9uLcRLlwsM8f2cpQGeQ3",
        createdAt: new Date("2025-11-27T03:47:43.409Z"),
        updatedAt: new Date("2025-11-27T03:49:44.092Z"),
      },
      {
        id: "cmihijaqs0005sac81jadrvrq",
        userId: "cmie5qy1g0000saa9qewooi9d",
        orderNumber: "ORD-1764252750626-3PLTMC39D",
        totalAmount: 38.97,
        status: "COMPLETED",
        stripePaymentIntentId: "pi_3SY5uvLcRLlwsM8f0bSGnEHI",
        createdAt: new Date("2025-11-27T14:12:30.629Z"),
        updatedAt: new Date("2025-11-27T14:12:56.861Z"),
      },
    ],
    skipDuplicates: true,
  });

  // ORDER ITEMS
  await prisma.orderItem.createMany({
    data: [
      {
        id: "cmigw7tge0006saslmru06m5o",
        orderId: "cmigw7tf50005saslu05qtwgo",
        productId: "cmid5grxu0001saorapvqr5gn",
        quantity: 2,
        priceAtPurchase: 9.99,
        createdAt: new Date("2025-11-27T03:47:43.454Z"),
        updatedAt: new Date("2025-11-27T03:47:43.454Z"),
      },
      {
        id: "cmigw7tge0007sasl0zxu8imr",
        orderId: "cmigw7tf50005saslu05qtwgo",
        productId: "cmid5grxu0003saorixmr4x14",
        quantity: 3,
        priceAtPurchase: 8.99,
        createdAt: new Date("2025-11-27T03:47:43.454Z"),
        updatedAt: new Date("2025-11-27T03:47:43.454Z"),
      },
      {
        id: "cmihijaqu0006sac880xy2iu1",
        orderId: "cmihijaqs0005sac81jadrvrq",
        productId: "cmid5grxu0002saor9cwalfor",
        quantity: 2,
        priceAtPurchase: 14.99,
        createdAt: new Date("2025-11-27T14:12:30.630Z"),
        updatedAt: new Date("2025-11-27T14:12:30.630Z"),
      },
      {
        id: "cmihijaqu0007sac8mfib56ak",
        orderId: "cmihijaqs0005sac81jadrvrq",
        productId: "cmid5grxu0003saorixmr4x14",
        quantity: 1,
        priceAtPurchase: 8.99,
        createdAt: new Date("2025-11-27T14:12:30.630Z"),
        updatedAt: new Date("2025-11-27T14:12:30.630Z"),
      },
    ],
    skipDuplicates: true,
  });

  // PROMOTIONS
  await prisma.promotion.createMany({
    data: [
      {
        id: "cmihipjvz0001sa8rdgcp19s8",
        name: "New Customer Discount",
        code: "WELCOME15",
        discount: 15,
        startDate: new Date("2024-01-01T00:00:00Z"),
        endDate: new Date("2024-12-31T00:00:00Z"),
        status: "ACTIVE",
        createdAt: new Date("2025-11-27T14:17:22.416Z"),
        updateAt: new Date("2025-11-27T14:17:22.416Z"),
      },
      {
        id: "cmihipjw10002sa8rusk61bc4",
        name: "Holiday Special",
        code: "HOLIDAY25",
        discount: 25,
        startDate: new Date("2024-12-01T00:00:00Z"),
        endDate: new Date("2024-12-31T00:00:00Z"),
        status: "SCHEDULED",
        createdAt: new Date("2025-11-27T14:17:22.417Z"),
        updateAt: new Date("2025-11-27T14:17:22.417Z"),
      },
      {
        id: "cmihipjvv0000sa8r89h9boux",
        name: "Summer Sale",
        code: "SUMMER20",
        discount: 20,
        startDate: new Date("2024-06-01T00:00:00Z"),
        endDate: new Date("2026-08-31T00:00:00Z"),
        status: "ACTIVE",
        createdAt: new Date("2025-11-27T14:17:22.412Z"),
        updateAt: new Date("2025-12-03T12:44:18.048Z"),
      },
    ],
    skipDuplicates: true,
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
