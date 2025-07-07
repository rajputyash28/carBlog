'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Send } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onSubscribeClick?: () => void;
}

export default function Header({ onSubscribeClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#232536] text-white sticky top-0 z-50 h-20 relative">
      <div className="absolute left-4 md:left-9 top-1/2 -translate-y-1/2">
        <Logo showText className="hidden sm:flex" />
        <Logo className="sm:hidden" />
      </div>

      <div className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 flex items-center space-x-4 md:space-x-8">
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link href="/" className="hover:text-gray-300 transition-colors text-sm lg:text-base">Home</Link>
          <Link href="/blogs" className="hover:text-gray-300 transition-colors text-sm lg:text-base">Blogs</Link>
          <Link href="/about" className="hover:text-gray-300 transition-colors text-sm lg:text-base">About</Link>
          <Link href="/contact" className="hover:text-gray-300 transition-colors text-sm lg:text-base">Contact Us</Link>
          <button 
            className="bg-white text-[#232536] px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm lg:text-base flex items-center gap-2"
            onClick={onSubscribeClick}
          >
            Subscribe 
          </button>
        </nav>

        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#232536] border-t border-gray-600 shadow-lg">
          <nav className="flex flex-col p-4 space-y-4">
            <Link href="/" className="hover:text-gray-300 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/blogs" className="hover:text-gray-300 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
            <Link href="/about" className="hover:text-gray-300 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
            <button 
              className="w-fit bg-white text-[#232536] px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2"
              onClick={() => {
                setIsMenuOpen(false);
                onSubscribeClick?.();
              }}
            >
              Subscribe <Send size={14} />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
