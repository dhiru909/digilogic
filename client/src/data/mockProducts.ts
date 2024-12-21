import {  ProductCategory } from '../types/product';
import { Product } from '@/types/index';
export const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Arduino Starter Kit',
    description: 'Complete kit for beginners with Arduino UNO board and components',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800',
    category: 'starter-kits'
  },
  {
    _id: '2',
    name: 'Advanced Microcontroller Kit',
    description: 'Professional kit with advanced components for complex projects',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800',
    category: 'advanced'
  },
  {
    _id: '3',
    name: 'Digital Logic Training Board',
    description: 'Educational board for learning digital logic concepts',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800',
    category: 'education'
  }
];

export const productCategories: ProductCategory[] = [
  {
    id: 'starter-kits',
    name: 'Starter Kits',
    description: 'Perfect for beginners'
  },
  {
    id: 'advanced',
    name: 'Advanced Kits',
    description: 'For experienced users'
  },
  {
    id: 'education',
    name: 'Educational Boards',
    description: 'Learning and training'
  }
];