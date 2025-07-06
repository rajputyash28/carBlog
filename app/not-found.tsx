import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Car, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Car className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full">
                <Home size={16} className="mr-2" />
                Go to Homepage
              </Button>
            </Link>
            
            <Link href="/blogs" className="block">
              <Button variant="outline" className="w-full">
                <Search size={16} className="mr-2" />
                Browse Blog Posts
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? <Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact us</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}