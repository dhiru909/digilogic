import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CircuitBoard, User, ShoppingCart, Menu, X } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { Separator } from '@radix-ui/react-dropdown-menu';

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="bg-background fixed w-full z-20 shadow-lg ">
      <div className="w-full mx-auto px-4 z-20 ">
        <div className="flex  z-20 justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <CircuitBoard className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl">DigiLogic</span>
            </Link>
            <div className="hidden md:flex items-center space-x-4 ml-8">
              <Link to="/products" className="text-primary hover:text-blue-600 px-3 py-2">Products</Link>
              {/* <Link to="/courses" className="text-primary hover:text-blue-600 px-3 py-2">Courses</Link> */}
              <Link to="/about" className="text-primary hover:text-blue-600 px-3 py-2">About</Link>
              <Link to="/careers" className="text-primary hover:text-blue-600 px-3 py-2">Careers</Link>
              <ModeToggle/>
            </div>
           
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-primary hover:text-blue-600">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link to="/profile" className="text-primary hover:text-blue-600">
              <User className="h-6 w-6" />
            </Link>
            {menuOpen ? (
            <Menu
              onClick={toggleMenu}
              className="text-3xl  cursor-pointer md:hidden z-50 duration-500 animate-fadeIn"
            />
          ) : (
            <X
              onClick={toggleMenu}
              className="text-3xl  cursor-pointer md:hidden z-50 animate-fadeIn duration-500"
            />
          )}
          </div>
        </div>
      </div>
      <Separator className='mb-3'/>
    </nav>

  );
}