import { UserProfile } from '../types/profile';

export const mockProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200',
  bio: 'Passionate about electronics and digital logic. Always learning and building new things.',
  location: 'San Francisco, CA',
  joinedDate: '2024-01-15',
  purchasedCourses: [
    {
      id: '1',
      title: 'Digital Logic Fundamentals',
      description: 'Learn the basics of digital logic design',
      duration: '6 hours',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0'
    }
  ],
  orderHistory: [
    {
      id: 'ORD001',
      date: '2024-03-01',
      status: 'delivered',
      total: 299.99,
      items: [
        {
          id: 'ITEM001',
          productId: 'PROD001',
          name: 'Arduino Starter Kit',
          quantity: 1,
          price: 299.99
        }
      ]
    }
  ]
};