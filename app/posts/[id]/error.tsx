'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Post page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Failed to Load Post
          </h1>
          
          <p className="text-gray-600 mb-6">
            We encountered an error while loading this blog post. This might be due to a network issue or the post might not exist.
          </p>
          
          <div className="space-y-3">
            <Button onClick={reset} className="w-full">
              <RefreshCw size={16} className="mr-2" />
              Try Again
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/blogs'}
              className="w-full"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog Posts
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
  );
}