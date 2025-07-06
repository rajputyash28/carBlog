'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function BlogsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Blogs page error:', error);
  }, [error]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#31323C] text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Car Blog
            </h1>
            <p className="text-gray-300 mb-6 md:mb-8 text-base md:text-lg">
              Your trusted source for automotive insights
            </p>
          </div>
        </div>
      </section>

      {/* Error Content */}
      <div className="min-h-[400px] bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Failed to Load Blog Posts
            </h2>
            
            <p className="text-gray-600 mb-6">
              We're having trouble loading the blog posts. This might be due to a network issue or server problem.
            </p>
            
            <div className="space-y-3">
              <Button onClick={reset} className="w-full">
                <RefreshCw size={16} className="mr-2" />
                Try Again
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                Go to Homepage
              </Button>
            </div>
            
            {error.digest && (
              <p className="text-xs text-gray-400 mt-4">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}