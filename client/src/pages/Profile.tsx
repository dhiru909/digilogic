import React from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import CoursesList from '../components/profile/CoursesList';
import OrderHistory from '../components/profile/OrderHistory';
import { UserProfile } from '../types/profile';

// Mock data - In a real app, this would come from an API
const mockProfile: UserProfile = {
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

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProfileHeader profile={mockProfile} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CoursesList courses={mockProfile.purchasedCourses} />
        <OrderHistory orders={mockProfile.orderHistory} />
      </div>
    </div>
  );
}