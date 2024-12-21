import axios from 'axios';
import { Product } from '../types/index';
import { Enquiry } from '../types/enquiry';
const API_URL = 'http://localhost:5000/api';

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const response = await axios.put(`${API_URL}/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/products/${id}`);
};



export const getEnquiries = async (): Promise<Enquiry[]> => {
  const response = await axios.get(`${API_URL}/enquiries`,{
    params:{
      status:['new','read']
    }
  });
  return response.data;
};

export const createEnquiry = async (enquiry: Omit<Enquiry, 'id' | 'status' | 'createdAt'>): Promise<Enquiry> => {
  const response = await axios.post(`${API_URL}/enquiries`, enquiry);
  return response.data;
};

export const updateEnquiryStatus = async (id: string, status: Enquiry['status']): Promise<Enquiry> => {
  const response = await axios.patch(`${API_URL}/enquiries/${id}/status`, { status });
  return response.data;
};

export const deleteEnquiry = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/enquiries/${id}`);
};