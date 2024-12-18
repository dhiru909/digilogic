import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onEnquire: () => void; // or any other type that makes sense for your use case

  
}

export default function ProductCard({ product,onEnquire }: ProductCardProps) {
  return (
    
    <div className="bg-primary-background border min-w-72 rounded-lg duration-200 fade-in-10 shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
          ₹{product.price.toFixed(2)}
          </span>
          <button onClick={()=>{
            onEnquire();
          }} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Enquire
          </button>
        </div>
      </div>
    </div>
  );
}