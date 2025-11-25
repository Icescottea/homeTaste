// src/components/UserDropdown.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { User, LogOut, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserDropdown() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsOpen(false);
    router.push('/');
    window.location.reload();
  };

  if (!user) {
    return (
      <button
        onClick={() => router.push('/login')}
        className="p-2 hover:bg-orange-50 rounded-full transition-colors"
      >
        <User className="w-6 h-6 text-gray-700" />
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-orange-50 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="hidden md:block font-medium text-gray-700">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            {user.role === 'ADMIN' && (
              <span className="inline-block mt-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">
                Admin
              </span>
            )}
          </div>

          {user.role === 'CUSTOMER' && (
            <button
              onClick={() => {
                setIsOpen(false);
                router.push('/my-orders');
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Package className="w-4 h-4" />
              <span>My Orders</span>
            </button>
          )}

          {user.role === 'ADMIN' && (
            <button
              onClick={() => {
                setIsOpen(false);
                router.push('/admin/dashboard');
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Package className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-200 mt-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}