import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export default function TeamMember({ name, role, image, bio }: TeamMemberProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-blue-600 mb-3">{role}</p>
        <p className="text-gray-600">{bio}</p>
      </div>
    </div>
  );
}