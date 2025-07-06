'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

export default function RouteTransition() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate route transition time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  // Determine loading variant based on route
  const getLoadingVariant = () => {
    if (pathname.includes('/posts/')) return 'car';
    if (pathname.includes('/blogs')) return 'sports';
    if (pathname.includes('/about')) return 'electric';
    return 'default';
  };

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4">
        <LoadingSpinner 
          variant={getLoadingVariant()}
          message="We are coming"
        />
      </div>
    </div>
  );
}