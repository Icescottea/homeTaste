'use client';

import React, { useState } from 'react';
import { ShoppingCart, User, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      name: "Turmeric Powder",
      price: 12.99,
      image: "/img/turmericPowder.png",
      rating: 4.8
    },
    {
      id: 2,
      name: "Curry Powder",
      price: 9.99,
      image: "/img/curryPowder.png",
      rating: 4.9
    },
    {
      id: 3,
      name: "Chilli Powder",
      price: 14.99,
      image: "/img/chilliPowder.png",
      rating: 4.7
    },
    {
      id: 4,
      name: "Chilli Flakes",
      price: 8.99,
      image: "/img/chilliFlakes.png",
      rating: 4.6
    },
    {
      id: 5,
      name: "Black Pepper",
      price: 11.99,
      image: "/img/blackPepper.png",
      rating: 4.8
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const getVisibleProducts = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(products[(currentSlide + i) % products.length]);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-orange-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-orange-600">HomeTaste</h1>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                  Home
                </a>
                <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                  Shop
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-orange-50 rounded-full transition-colors">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
              </button>
              <Link href="/login" className="p-2 hover:bg-orange-50 rounded-full transition-colors block">
                <User className="w-6 h-6 text-gray-700" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-orange-100 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Authentic Spices for Your Home Kitchen
              </h2>
              <p className="text-xl text-gray-600">
                Experience the rich flavors of premium, hand-selected spices sourced directly from farms to your kitchen.
              </p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl">
                Shop Now
              </button>
            </div>
            <div className="relative h-96 md:h-[500px]">
              <img
                src="/img/logoHs.png"
                alt="Colorful spices"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h3>
            <p className="text-xl text-gray-600">Our most popular spices, loved by home chefs</p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getVisibleProducts().map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-orange-500 text-orange-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-600">${product.price}</span>
                      <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-orange-50 p-3 rounded-full shadow-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-orange-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-orange-50 p-3 rounded-full shadow-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-orange-600" />
            </button>
          </div>
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
    </div>
  );
};

export default HomePage;