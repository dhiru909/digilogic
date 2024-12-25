import React, {  useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircuitBoard, Menu, User, X } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  // const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const {user, setUser } = useAuth();
  console.log("navbar",user);
  useEffect(()=>{
    if(user){
      setUser(user);
    }
  })
  /**
   * Toggle the mobile menu open or closed
   */
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const menuRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  // close the mobile menu on click outside
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //       setMenuOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);
  return (
    <nav className="bg-background fixed w-full z-20 shadow-lg border ">
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center  w-full content-between justify-between">
            <Link to="/" className="flex items-center ">
              <CircuitBoard className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl">ApnaVision</span>
            </Link>
            <div className="hidden md:flex items-center  justify-center w-full space-x-4 ml-8">
              <Link to="/products" className="text-primary hover:text-blue-600 px-3 py-2">Products</Link>
              <Link to="/about" className="text-primary hover:text-blue-600 px-3 py-2">About</Link>
              <Link to="/careers" className="text-primary hover:text-blue-600 px-3 py-2">Careers</Link>
              <Link to="/workshop" className="text-primary hover:text-blue-600 px-3 py-2">Workshop</Link>

              <ModeToggle />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {
               user ?(
                <Link  to="/profile" className="text-primary hover:text-blue-600">
                <User className="h-6 ml-6 mr-2 w-6" />
              </Link>
              ):(
                <div className='flex  p-4 flex-row space-x-3 ml-4 w-fit items-center'>
                  <Link to="/login" className="text-primary hover:text-blue-600">
                    Login
                  </Link>
                  <Link to="/signup" className="text-primary hover:text-blue-600" >
                    Signup
                  </Link>
                </div>
              )
            }
           
            <button onClick={toggleMenu} className="md:hidden text-3xl cursor-pointer">
              {menuOpen ? (
                <X className="text-3xl border" />
              ) : (
                <Menu className="text-3xl border" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div ref={menuRef} className="md:hidden fade-in-15 slide-in-from-top-24 duration-700  top-16 left-0 w-full bg-background shadow-lg z-10">
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link to="/products" className="text-primary hover:text-blue-600">Products</Link>
              <Link to="/about" className="text-primary hover:text-blue-600">About</Link>
              <Link to="/careers" className="text-primary hover:text-blue-600">Careers</Link>
              <ModeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
