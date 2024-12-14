import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Book, Users } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative  text-primary">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Master Digital Logic with Our Advanced Microcontroller Kits
            </h1>
            <p className="text-xl mb-8 ">
              Start your journey into the world of digital electronics with our comprehensive learning solutions
            </p>
            <Link
              to="/products"
              className="inline-flex items-center   px-6 py-3 rounded-lg font-semibold hover:bg-secondary border-b transition-colors"
            >
              Explore Products <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="py-24 bg-primary-background border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <Cpu className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Hardware</h3>
              <p className="text-muted-foreground">
                High-quality microcontroller kits designed for learning and development
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <Book className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Comprehensive Courses</h3>
              <p className="text-muted-foreground">
                Structured learning paths from basics to advanced concepts
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community Support</h3>
              <p className="text-muted-foreground">
                Join our community of learners and experts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-24 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background border rounded-lg shadow-lg overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800`}
                  alt="Product"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Starter Kit {i}</h3>
                  <p className="text-muted-foreground mb-4">Perfect for beginners to learn digital logic</p>
                  <Link
                    to={`/products/${i}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}