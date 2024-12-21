import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../middleware/errorHandler';
import { IProduct } from '../types/product';

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
});

export const createProduct = asyncHandler(async (req: Request<{}, {}, IProduct>, res: Response) => {
  const product = new Product(req.body);
  const newProduct = await product.save();
  res.status(201).json(newProduct);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError(404, 'Product not found');
  }

  Object.assign(product, req.body);
  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError(404, 'Product not found');
  }

  await product.deleteOne();
  res.json({ message: 'Product deleted' });
});