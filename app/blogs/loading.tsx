import LoadingSpinner from '@/components/LoadingSpinner';

export default function BlogsLoading() {
  return (
    <div>
      {/* Hero Section Skeleton with Enhanced Animation */}
      <section className="bg-[#31323C] text-white py-8 md:py-16 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 border border-white rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-20 left-1/3 w-12 h-12 border border-white rounded-full animate-pulse delay-150"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="z-10 text-center lg:text-left order-2 lg:order-1">
              <div className="h-8 md:h-12 bg-gray-600 rounded mb-4 md:mb-6 animate-pulse"></div>
              <div className="h-4 bg-gray-600 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-600 rounded mb-6 md:mb-8 w-3/4 animate-pulse"></div>
              <div className="h-10 md:h-12 bg-gray-600 rounded w-32 animate-pulse"></div>
            </div>
            
            {/* Enhanced Image Skeleton Grid */}
            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full order-1 lg:order-2 max-w-[500px] mx-auto lg:mx-0">
              <div className="absolute top-0 left-0 w-[80px] sm:w-[100px] md:w-[140px] lg:w-[180px] h-[120px] sm:h-[150px] md:h-[210px] lg:h-[280px] bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg animate-pulse shadow-lg"></div>
              <div className="absolute top-[20px] sm:top-[30px] md:top-[40px] lg:top-[50px] left-[60px] sm:left-[80px] md:left-[110px] lg:left-[140px] w-[80px] sm:w-[100px] md:w-[140px] lg:w-[180px] h-[120px] sm:h-[150px] md:h-[210px] lg:h-[280px] bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg animate-pulse delay-150 shadow-xl"></div>
              <div className="absolute top-0 left-[120px] sm:left-[150px] md:left-[210px] lg:left-[270px] w-[70px] sm:w-[90px] md:w-[120px] lg:w-[160px] h-[120px] sm:h-[150px] md:h-[210px] lg:h-[280px] bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg animate-pulse delay-300 shadow-lg"></div>
              <div className="absolute top-[15px] sm:top-[25px] md:top-[35px] lg:top-[45px] left-[170px] sm:left-[210px] md:left-[290px] lg:left-[380px] w-[80px] sm:w-[100px] md:w-[140px] lg:w-[180px] h-[120px] sm:h-[150px] md:h-[210px] lg:h-[280px] bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg animate-pulse delay-450 shadow-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search and Filter Section Skeleton */}
      <section className="py-6 md:py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md w-full">
                <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-400 rounded-md animate-pulse shadow-sm"></div>
              </div>
              <div className="h-6 w-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse"></div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="h-6 w-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse"></div>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-8 w-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-md animate-pulse shadow-sm" style={{ animationDelay: `${i * 100}ms` }}></div>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="h-6 w-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse"></div>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-8 w-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-md animate-pulse shadow-sm" style={{ animationDelay: `${i * 150}ms` }}></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Loading with Sports Car Animation */}
      <div className="bg-white">
        <LoadingSpinner 
          variant="sports" 
          message="Loading car blogs and real car data..." 
        />
      </div>
    </div>
  );
}