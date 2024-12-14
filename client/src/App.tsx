// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import Products from './pages/Products';
import { ThemeProvider } from './components/theme-provider';
import ScrollToTopButton from './components/scroll-to-top-button';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <ScrollToTopButton />
        <main className="flex-grow mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}