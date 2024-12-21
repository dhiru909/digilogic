import { Document } from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt?: Date;
}

export interface IProductDocument extends IProduct, Document {}