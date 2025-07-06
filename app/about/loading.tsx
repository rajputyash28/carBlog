import LoadingSpinner from '@/components/LoadingSpinner';

export default function AboutLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="text-center mb-8 md:mb-12">
        <div className="h-8 md:h-12 bg-gradient-to-r from-green-300 to-green-400 rounded mb-4 md:mb-6 animate-pulse mx-auto w-80 shadow-sm"></div>
        <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse mx-auto w-96 shadow-sm"></div>
      </div>

      <div className="space-y-8 md:space-y-12">
        {[1, 2, 3, 4].map(section => (
          <section key={section} className="mb-8 md:mb-12">
            <div className="h-6 md:h-8 bg-gradient-to-r from-green-300 to-green-400 rounded mb-4 md:mb-6 animate-pulse w-64 shadow-sm" style={{ animationDelay: `${section * 100}ms` }}></div>
            <div className="space-y-4">
              {[1, 2, 3].map(line => (
                <div key={line} className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse shadow-sm" style={{ animationDelay: `${(section * 3 + line) * 50}ms` }}></div>
              ))}
              <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse w-3/4 shadow-sm"></div>
            </div>
          </section>
        ))}
      </div>

      {/* Electric Car Loading Animation */}
      <div className="mt-12">
        <LoadingSpinner 
          variant="electric" 
          message="Loading about our sustainable automotive future..." 
        />
      </div>
    </div>
  );
}