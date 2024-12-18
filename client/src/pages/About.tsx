// import React from 'react';
import { Users, Award, Globe, MessageSquare } from 'lucide-react';
import TeamMember from '../components/about/TeamMember';
import ValueCard from '../components/about/ValueCard';
import ContactSection from '../components/about/ContactSection';

export default function About() {
  const values = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Community-Driven",
      description: "Building a strong community of learners and innovators passionate about digital electronics."
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Excellence",
      description: "Committed to providing the highest quality educational materials and hardware kits."
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "Global Impact",
      description: "Empowering students and professionals worldwide to master digital logic."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      title: "Support",
      description: "Dedicated to providing exceptional customer support and educational guidance."
    }
  ];

  const team = [
    {
      name: "Tapeshwar Kumar",
      role: "Founder & CEO",
      image: "",
      bio: "Passionate Electronics and Communication Engineer"
    },
    {
      name: "Dhiraj Kumar",
      role: "CTO",
      image: "",
      bio: "Educational technology expert with focus on interactive learning"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empowering the Future of Digital Innovation
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            DigiLogic is dedicated to making digital logic education accessible, engaging, and effective for everyone.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To revolutionize digital logic education by providing cutting-edge hardware kits, comprehensive courses, 
              and a supportive learning environment for students and professionals worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid justify-center w-full grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}