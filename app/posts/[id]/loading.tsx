import LoadingSpinner from '@/components/LoadingSpinner';

export default function PostLoading() {
  return (
    <div>
      {/* Enhanced Hero Image Skeleton */}
      <section className="relative h-64 md:h-96 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse overflow-hidden">
        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        
        {/* Car Info Skeleton */}
        <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 bg-gradient-to-r from-gray-500 to-gray-600 p-3 md:p-4 rounded-lg w-64 h-20 animate-pulse shadow-lg">
          <div className="h-4 bg-gray-400 rounded mb-2 w-3/4"></div>
          <div className="h-3 bg-gray-400 rounded mb-2 w-1/2"></div>
          <div className="h-6 bg-gray-400 rounded w-16"></div>
        </div>
        
        {/* Speed Lines Animation */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent animate-pulse delay-300 mt-4"></div>
      </section>

      {/* Enhanced Post Content Skeleton */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="mb-6 md:mb-8">
          {/* Title skeleton with gradient */}
          <div className="h-8 md:h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-4 md:mb-6 animate-pulse shadow-sm"></div>
          
          {/* Author info skeleton */}
          <div className="flex items-center mb-4 md:mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-300 to-blue-400 mr-3 md:mr-4 animate-pulse shadow-sm"></div>
            <div>
              <div className="h-4 w-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-2 animate-pulse"></div>
              <div className="h-3 w-48 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse"></div>
            </div>
          </div>
          
          {/* Enhanced Featured vehicle skeleton */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg mb-4 md:mb-6 border border-blue-200">
            <div className="h-5 w-32 bg-gradient-to-r from-blue-300 to-blue-400 rounded mb-2 animate-pulse"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-16 bg-gradient-to-r from-blue-300 to-blue-400 rounded mb-1 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                  <div className="h-4 w-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse" style={{ animationDelay: `${i * 150}ms` }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Content skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-3/4 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse shadow-sm"></div>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
          ))}
          <div className="h-4 w-2/3 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse"></div>
        </div>

        {/* Enhanced Car specs skeleton */}
        <div className="mt-12 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
          <div className="h-6 w-48 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-4 animate-pulse"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="h-4 w-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-1 mx-auto animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                <div className="h-6 w-20 bg-gradient-to-r from-blue-300 to-blue-400 rounded mx-auto animate-pulse" style={{ animationDelay: `${i * 150}ms` }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation skeleton */}
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-between gap-4">
          <div className="h-10 w-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse shadow-sm"></div>
          <div className="h-10 w-24 bg-gradient-to-r from-blue-300 to-blue-400 rounded animate-pulse shadow-sm"></div>
        </div>
      </article>

      {/* Car Loading Animation */}
      <div className="bg-gray-50 py-8">
        <LoadingSpinner 
          variant="car" 
          message="Loading detailed car review..." 
        />
      </div>
    </div>
  );
}