import { Link } from "react-router-dom";
import {
  CircuitBoard,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <footer className="bg-background">
      <Separator />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <CircuitBoard className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">ApnaVision</span>
            </div>
            <p className="mt-4 text-gray-400">
              Empowering the next generation of digital innovators
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">
                  Products
                </Link>
              </li>
              {/* <li><Link to="/courses" className="text-gray-400 hover:text-white">Courses</Link></li> */}
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {/* <a href="#" className="text-gray-400 hover:text-white"><Facebook /></a> */}
              {/* <a href="#" className="text-gray-400 hover:text-white"><Twitter /></a> */}
              <a
                target="_blank"
                href="https://www.instagram.com/apnavision2030?igsh=MXA3cnYyMWtubnQwcw==&utm_source=ig_contact_invite"
                className="text-gray-400 hover:text-white"
              >
                <Instagram />
              </a>
              <a
                target="_blank"
                href="https://www.youtube.com/@ApnaVision-T2D"
                className="text-gray-400 hover:text-white"
              >
                <Youtube />
              </a>
              <a
                target="_blank"
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin />
              </a>
            </div>
          </div>
        </div>
        <div className=" border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} ApnaVision. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
