import { Course, User } from ".";

export interface UserProfile extends User {
  avatar?: string;
  bio?: string;
  location?: string;
  joinedDate: string;
  purchasedCourses: Course[];
  orderHistory: Order[];
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'shipped' | 'delivered';
  total: number;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
}