export type Product = {
  id: number;
  userId: string;
  imageUrl?: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'archived';
  price: number;
  stock: number;
  updatedAt: Date;
  createdAt: Date;
};

export type CreateProductInput = Omit<Product, 'id' | 'userId' | 'updatedAt' | 'createdAt'>;

export type UpdateProductInput = Partial<CreateProductInput>;
