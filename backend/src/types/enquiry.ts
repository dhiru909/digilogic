import { Document } from 'mongoose';
import { IProduct } from './product';

export interface IEnquiry {
  email: string;
  name: string;
  phone?: string;
  message: string;
  productId:IProduct
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

export interface IEnquiryDocument extends IEnquiry, Document {}