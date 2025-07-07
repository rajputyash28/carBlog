'use client';

import Link from 'next/link';
import { useState, forwardRef } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterSchema, NewsletterData } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import SuccessMessage from '@/components/ui/SuccessMessage';

const Footer = forwardRef<HTMLDivElement>((_, ref) => {
  const [showSuccess, setShowSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema)
  });

  const onSubmit = async (data: NewsletterData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowSuccess(true);
    reset();
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <>
      {showSuccess && (
        <SuccessMessage 
          message="Successfully subscribed to newsletter!" 
          onClose={() => setShowSuccess(false)}
        />
      )}
      
      <footer ref={ref} className="bg-[#232536] text-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
              Subscribe to our newsletter for the latest automotive insights and reviews
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-white text-gray-900"
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="whitespace-nowrap"
                isSubscribe
              >
                Subscribe
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Logo size="md" showText />
              </div>
              <p className="text-gray-300 mb-4 max-w-md mx-auto lg:mx-0">
                Your trusted source for automotive expertise, reviews, and insights.<br />
                Contact us: info@carblog.com | +1 (555) 123-4567
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-center">
                <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
                <Link href="/blogs" className="hover:text-gray-300 transition-colors">Blog</Link>
                <Link href="/about" className="hover:text-gray-300 transition-colors">About us</Link>
                <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact us</Link>
                <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
              </nav>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end space-x-4 pt-8 border-t border-gray-600">
            <a href="#" className="text-gray-300 hover:text-white transition-colors p-2"><Facebook size={20} /></a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors p-2"><Twitter size={20} /></a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors p-2"><Instagram size={20} /></a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors p-2"><Linkedin size={20} /></a>
          </div>
        </div>
      </footer>
    </>
  );
});

Footer.displayName = "Footer";
export default Footer;
