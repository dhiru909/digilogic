// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Products from "./pages/Products";
import { ThemeProvider } from "./components/theme-provider";
import ScrollToTopButton from "./components/scroll-to-top-button";
import Admin from "./pages/Admin";
import { Toaster } from "./components/ui/toaster";
import Careers from "./pages/Careers";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./hooks/useAuth";
import Workshops from "./pages/Workshops";
import { useEffect, useState } from "react";
import orientationImage from "../public/portrait.svg";
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl">Page not found</p>
    </div>
  );
}

export default function App() {
  const [orientation, setOrientation] = useState("");
  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.screen.orientation.type);
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div style={{ pointerEvents: "none" }}
        className={`h-[100svh] flex flex-col fixed top-0 left-0 z-30 w-[100vw] items-center  justify-center align-middle text-center bg-background ${
          orientation == "landscape-primary" ? "block" : "hidden"
        }`}
      >
        <h1 className="text-7xl mb-4  p-6 rounded-lg border-4">
          😓Rotate the device😕
        </h1>
        <img className="h-10 w-10 mix-blend-hue" src={orientationImage}></img>
      </div>
      <Toaster />
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <ScrollToTopButton />
            <main className="flex-grow mt-16">
              <Routes>
                <Route path="/admin" element={<Admin />} />
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="*" element={<NotFound />} /> {/* 404 Route */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

