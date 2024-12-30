import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../middleware/errorHandler';
import { IProduct } from '../types/product';
import { uploadToS3 } from '../utils/uploadToS3';

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


export const uploadProductImage = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' }).end();
      return;
    }

    const url = await uploadToS3("product",req.file)
    res.json({ url });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file' });
  }
});

