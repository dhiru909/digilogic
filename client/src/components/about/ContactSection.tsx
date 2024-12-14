import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600">support@digilogic.edu</p>
          </div>
          <div className="text-center">
            <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div className="text-center">
            <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600">123 Innovation Drive<br />San Francisco, CA 94105</p>
          </div>
        </div>
      </div>
    </div>
  );
}