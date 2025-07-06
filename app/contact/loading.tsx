import LoadingSpinner from '@/components/LoadingSpinner';

export default function ContactLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="text-center mb-8 md:mb-12">
        <div className="h-8 md:h-12 bg-gradient-to-r from-blue-300 to-blue-400 rounded mb-4 md:mb-6 animate-pulse mx-auto w-64 shadow-sm"></div>
        <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse mx-auto w-96 shadow-sm"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Form Skeleton */}
        <div className="order-2 lg:order-1">
          <div className="h-6 bg-gradient-to-r from-blue-300 to-blue-400 rounded mb-6 animate-pulse w-48 shadow-sm"></div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map(field => (
              <div key={field}>
                <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-2 animate-pulse w-24 shadow-sm" style={{ animationDelay: `${field * 100}ms` }}></div>
                <div className={`bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse shadow-sm ${field === 4 ? 'h-32' : 'h-10'}`} style={{ animationDelay: `${field * 150}ms` }}></div>
              </div>
            ))}
            <div className="h-12 bg-gradient-to-r from-blue-300 to-blue-400 rounded animate-pulse shadow-sm"></div>
          </div>
        </div>

        {/* Contact Information Skeleton */}
        <div className="order-1 lg:order-2">
          <div className="h-6 bg-gradient-to-r from-blue-300 to-blue-400 rounded mb-6 animate-pulse w-32 shadow-sm"></div>
          <div className="space-y-6 md:space-y-8">
            {[1, 2, 3].map(item => (
              <div key={item} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-300 to-blue-400 rounded-lg animate-pulse shadow-sm" style={{ animationDelay: `${item * 100}ms` }}></div>
                <div className="flex-1">
                  <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-2 animate-pulse w-20 shadow-sm" style={{ animationDelay: `${item * 150}ms` }}></div>
                  <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-1 animate-pulse w-32 shadow-sm" style={{ animationDelay: `${item * 200}ms` }}></div>
                  <div className="h-3 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse w-40 shadow-sm" style={{ animationDelay: `${item * 250}ms` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Default Loading Animation */}
      <div className="mt-12">
        <LoadingSpinner 
          variant="default" 
          message="Preparing contact form..." 
        />
      </div>
    </div>
  );
}