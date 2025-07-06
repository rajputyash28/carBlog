import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header placeholder */}
      <div className="bg-[#232536] h-20 shadow-lg"></div>
      
      {/* Main loading content with enhanced styling */}
      <div className="flex items-center justify-center py-20">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-gray-100">
          <LoadingSpinner 
            variant="car" 
            message="Loading your automotive experience..." 
          />
        </div>
      </div>
    </div>
  );
}