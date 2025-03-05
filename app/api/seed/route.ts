import { db, products } from 'lib/db';
import { users } from 'lib/schema/user';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Create admin user if not exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, 'admin@example.com'))
    .then(res => res[0]);

  if (!existingUser) {
    await db.insert(users).values({
      email: 'admin@example.com',
      name: 'Admin User',
      imageUrl: '/placeholder-user.jpg',
      provider: 'seed',
      updatedAt: new Date(),
      createdAt: new Date()
    });
  }

  // Create products
  await db.insert(products).values([
    {
      imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/smartphone-gaPvyZW6aww0IhD3dOpaU6gBGILtcJ.webp',
      name: 'Smartphone X Pro',
      description: 'Latest flagship smartphone with advanced features',
      status: 'active',
      price: '999.00',
      stock: 150,
      userId: 'admin@example.com',
      updatedAt: new Date(),
      createdAt: new Date()
    },
    {
      imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/earbuds-3rew4JGdIK81KNlR8Edr8NBBhFTOtX.webp',
      name: 'Wireless Earbuds Ultra',
      description: 'Premium wireless earbuds with noise cancellation',
      status: 'active',
      price: '199.00',
      stock: 300,
      userId: 'admin@example.com',
      updatedAt: new Date(),
      createdAt: new Date()
    },
    {
      imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/home-iTeNnmKSMnrykOS9IYyJvnLFgap7Vw.webp',
      name: 'Smart Home Hub',
      description: 'Central control for your smart home devices',
      status: 'active',
      price: '149.00',
      stock: 200,
      userId: 'admin@example.com',
      updatedAt: new Date(),
      createdAt: new Date()
    },
    {
      imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/tv-H4l26crxtm9EQHLWc0ddrsXZ0V0Ofw.webp',
      name: '4K Ultra HD Smart TV',
      description: 'Crystal clear 4K resolution with smart features',
      status: 'active',
      price: '799.00',
      stock: 50,
      userId: 'admin@example.com',
      updatedAt: new Date(),
      createdAt: new Date()
    },
    {
      imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/laptop-9bgUhjY491hkxiMDeSgqb9R5I3lHNL.webp',
      name: 'Gaming Laptop Pro',
      description: 'High-performance gaming laptop with RTX graphics',
      status: 'active',
      price: '1299.00',
      stock: 75,
      userId: 'admin@example.com',
      updatedAt: new Date(),
      createdAt: new Date()
    },
    {
      imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/headset-lYnRnpjDbZkB78lS7nnqEJFYFAUDg6.webp',
      name: 'VR Headset Plus',
      description: 'Next-gen virtual reality gaming experience',
      status: 'inactive',
      price: '349.00',
      stock: 120,
      userId: 'admin@example.com',
      updatedAt: new Date(),
      createdAt: new Date()
    },
    {
      imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/watch-S2VeARK6sEM9QFg4yNQNjHFaHc3sXv.webp',
      name: 'Smartwatch Elite',
      description: 'Advanced fitness and health tracking smartwatch',
      status: 'archived',
      price: '249.00',
      stock: 250,
      userId: 'admin@example.com',
      updatedAt: new Date(),
      createdAt: new Date()
    },
    {
      imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/speaker-4Zk0Ctx5AvxnwNNTFWVK4Gtpru4YEf.webp',
      name: 'Bluetooth Speaker Max',
      description: 'Powerful portable speaker with deep bass',
      status: 'inactive',
      price: '99.00',
      stock: 400,
      userId: 'admin@example.com',
      updatedAt: new Date(),
      createdAt: new Date()
    },
    {
      imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/charger-GzRr0NSkCj0ZYWkTMvxXGZQu47w9r5.webp',
      name: 'Portable Charger Super',
      description: 'High-capacity portable power bank',
      status: 'active',
      price: '59.00',
      stock: 500,
      userId: 'admin@example.com',
      updatedAt: new Date(),
      createdAt: new Date()
    },
    {
      imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/thermostat-8GnK2LDE3lZAjUVtiBk61RrSuqSTF7.webp',
      name: 'Smart Thermostat Pro',
      description: 'Energy-efficient smart home temperature control',
      status: 'active',
      price: '199.00',
      stock: 175,
      userId: 'admin@example.com',
      updatedAt: new Date(),
      createdAt: new Date()
    }
  ]);

  return Response.json({
    message: 'Database seeded successfully'
  });
}
