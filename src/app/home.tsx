// src/app/home.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, ChevronLeft, ChevronRight, Car } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartSidebar from '@/components/CartSidebar';
import UserDropdown from '@/components/UserDropdown';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cartCount, setIsCartOpen, addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product.id, product.name, product.price, product.image, product.stock);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const getVisibleProducts = () => {
    if (products.length === 0) return [];
    const visible = [];
    for (let i = 0; i < Math.min(3, products.length); i++) {
      visible.push(products[(currentSlide + i) % products.length]);
    }
    return visible;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white/85 backdrop-blur-md fixed top-0 left-0 w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-28">
            <div className="flex items-center space-x-8">
              <Link href="/">
                <img
                  src="/img/logoHs.png"
                  alt="Colorful spices"
                  className="w-auto h-48"
                />
              </Link>
              <div className="hidden md:flex space-x-6 text-lg">
                <Link href="/" className="text-gray-800 hover:text-orange-500 font-medium transition-colors">
                  Home
                </Link>
                <a onClick={scrollToProducts} className="text-gray-800 hover:text-orange-500 font-medium transition-colors cursor-pointer">
                  Shop
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:bg-orange-50 rounded-full transition-colors relative"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <UserDropdown />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative min-h-[95vh] flex items-center bg-cover bg-no-repeat bg-left-top pt-40"
        style={{ backgroundImage: "url('/img/spice5.jpg')" }}
      >
        {/* Dark overlay to make text readable */}
        <div className="absolute inset-0 bg-black/15"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* TEXT */}
            <div className="space-y-6 text-white drop-shadow-lg">
              <h2 className="text-6xl drop-shadow-[0_0_10px_rgba(0,0,0,0.9)] md:text-7xl font-bold leading-tight">
                Authentic Spices for Your Home Kitchen
              </h2>

              <p className="text-xl md:text-2xl drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">
                Experience the rich flavors of premium, hand-selected spices sourced
                directly from farms to your kitchen.
              </p>

              <button id="cta" className="text-white font-semibold text-xl" onClick={scrollToProducts}>
                Shop Now
              </button>
            </div>

            {/* IMAGE on right */}
            <div className="relative h-96 md:h-[32rem]">
              <img
                src="/img/spice4.jpg"
                alt="Colorful spices"
                className="w-full h-full object-cover rounded-2xl shadow-1xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Carousel */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h3>
            <p className="text-xl text-gray-600">Our most popular spices, loved by home chefs</p>
          </div>

          {products.length > 0 ? (
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {getVisibleProducts().map((product, index) => (
                <div
                  key={product.id}
                  className="
                    bg-red-50 border border-gray-200 rounded-xl overflow-hidden 
                    hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1
                    opacity-100
                  "
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {product.stock < 10 && product.stock > 0 && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                        Only {product.stock} left!
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="
                          bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg 
                          font-medium transition-all duration-500 
                          disabled:bg-gray-400 disabled:cursor-not-allowed 
                          transform hover:scale-105 active:scale-95
                        "
                      >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              </div>
            
              {/* Carousel Controls */}
              {products.length > 3 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-orange-50 p-3 rounded-full shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-110 active:scale-95 z-10"
                  >
                    <ChevronLeft className="w-6 h-6 text-orange-600" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-orange-50 p-3 rounded-full shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-110 active:scale-95 z-10"
                  >
                    <ChevronRight className="w-6 h-6 text-orange-600" />
                  </button>
                </>
              )}

              {/* Dot Indicators */}
              {products.length > 3 && (
                <div className="flex justify-center gap-2 mt-8">
                  {products.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentSlide
                          ? 'w-8 bg-orange-600'
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-600">No products available</div>
          )}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 md:h-[500px]">
              <img
                src="/img/spiceFarm.jpeg"
                alt="Spice farm"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-4xl font-bold text-gray-900">Our Story</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                HomeTaste was born from a passion for authentic flavors and a commitment to quality. We work directly with farmers across the globe to bring you the finest, freshest spices.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every spice is carefully selected, processed, and packaged to preserve its natural aroma and taste. We believe that great cooking starts with great ingredients.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">Organic</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Varieties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold text-orange-500 mb-4">HomeTaste</h4>
              <p className="text-gray-400">
                Bringing authentic flavors to your home kitchen since 2020.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Shop</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Shipping</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Newsletter</h5>
              <p className="text-gray-400 mb-4">Subscribe for exclusive offers and recipes.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-orange-500"
                />
                <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HomeTaste. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/*Cart Sidebare */}
      <CartSidebar />
    </div>
  );
}

const scrollToProducts = () => {
  var productsSection = document.getElementById("products");
  productsSection?.scrollIntoView({
    behavior: "smooth"
  });
}