import React from 'react';
import { UserProfile } from '../../types/profile';
import { MapPin, Calendar } from 'lucide-react';

interface ProfileHeaderProps {
  profile: UserProfile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="bg-primary-background border   rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-6">
        <img
          src={profile.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200'}
          alt={profile.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-gray-600">{profile.email}</p>
          {profile.location && (
            <div className="flex items-center text-gray-600 mt-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{profile.location}</span>
            </div>
          )}
          <div className="flex items-center text-gray-600 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Joined {new Date(profile.joinedDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      {profile.bio && (
        <p className="mt-4 text-gray-700">{profile.bio}</p>
      )}
    </div>
  );
}