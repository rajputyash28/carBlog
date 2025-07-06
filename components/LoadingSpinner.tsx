'use client';

import { useState, useEffect } from 'react';
import { Car, Zap, Fuel, Settings } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  variant?: 'default' | 'car' | 'electric' | 'sports';
}

export default function LoadingSpinner({ 
  message = "Loading...", 
  variant = 'car' 
}: LoadingSpinnerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loadingText, setLoadingText] = useState(message);

  useEffect(() => {
    const frames = ['⚡', '🚗', '💨', '🏁'];
    const texts = [
      'Starting engine...',
      'Shifting gears...',
      'Accelerating...',
      'Almost there!'
    ];

    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const next = (prev + 1) % frames.length;
        setLoadingText(texts[next]);
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const renderCarAnimation = () => {
    return (
      <div className="relative w-32 h-20 mx-auto mb-6">
        {/* Road */}
        <div className="absolute bottom-0 w-full h-2 bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gray-400 to-gray-500 animate-pulse"></div>
        </div>
        
        {/* Car Body */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg animate-bounce">
          {/* Car Windows */}
          <div className="absolute top-1 left-2 w-3 h-2 bg-blue-200 rounded-sm"></div>
          <div className="absolute top-1 right-2 w-3 h-2 bg-blue-200 rounded-sm"></div>
          
          {/* Headlights */}
          <div className="absolute top-3 left-0 w-1 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
          <div className="absolute top-3 right-0 w-1 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
        </div>
        
        {/* Wheels */}
        <div className="absolute bottom-1 left-3 w-3 h-3 bg-gray-800 rounded-full animate-spin"></div>
        <div className="absolute bottom-1 right-3 w-3 h-3 bg-gray-800 rounded-full animate-spin"></div>
        
        {/* Exhaust Smoke */}
        <div className="absolute bottom-3 right-0 w-2 h-1 bg-gray-400 rounded-full opacity-50 animate-ping"></div>
        
        {/* Speed Lines */}
        <div className="absolute top-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent animate-pulse"></div>
        <div className="absolute top-6 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-pulse delay-150"></div>
      </div>
    );
  };

  const renderElectricAnimation = () => {
    return (
      <div className="relative w-24 h-24 mx-auto mb-6">
        {/* Electric Car */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-lg animate-pulse">
          <Zap className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white animate-bounce" />
        </div>
        
        {/* Electric Particles */}
        <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute -top-2 -right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-300"></div>
        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-150"></div>
        <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-450"></div>
        
        {/* Charging Effect */}
        <div className="absolute inset-0 border-2 border-green-300 rounded-lg animate-pulse"></div>
      </div>
    );
  };

  const renderSportsAnimation = () => {
    return (
      <div className="relative w-28 h-16 mx-auto mb-6">
        {/* Sports Car Body */}
        <div className="absolute bottom-0 w-full h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg transform skew-x-12 animate-pulse">
          {/* Spoiler */}
          <div className="absolute -top-1 right-2 w-4 h-1 bg-red-700 rounded"></div>
          
          {/* Racing Stripes */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-white opacity-80"></div>
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 translate-x-2 w-1 h-6 bg-white opacity-80"></div>
        </div>
        
        {/* Wheels */}
        <div className="absolute bottom-0 left-2 w-4 h-4 bg-gray-900 rounded-full animate-spin border-2 border-yellow-400"></div>
        <div className="absolute bottom-0 right-2 w-4 h-4 bg-gray-900 rounded-full animate-spin border-2 border-yellow-400"></div>
        
        {/* Flame Effect */}
        <div className="absolute bottom-2 -right-2 w-3 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-3 -right-1 w-2 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse delay-150"></div>
      </div>
    );
  };

  const renderDefaultAnimation = () => {
    return (
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        <Car className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 animate-pulse" />
      </div>
    );
  };

  const renderAnimation = () => {
    switch (variant) {
      case 'car':
        return renderCarAnimation();
      case 'electric':
        return renderElectricAnimation();
      case 'sports':
        return renderSportsAnimation();
      default:
        return renderDefaultAnimation();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {renderAnimation()}
      
      {/* Loading Text with Animation */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 animate-pulse">
          {loadingText}
        </h3>
        {/* <p className="text-gray-600 text-sm">{message}</p> */}
        
        {/* Progress Dots */}
        {/* <div className="flex justify-center space-x-2 mt-4">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentFrame 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div> */}
      </div>
      
      {/* Fun Loading Facts */}
      <div className="mt-6 max-w-md text-center">
        <p className="text-xs text-gray-500 italic">
          {variant === 'electric' && "⚡ Did you know? Electric cars can accelerate faster than most gas cars!"}
          {variant === 'sports' && "🏎️ Fun fact: The fastest production car can reach 300+ mph!"}
          {variant === 'car' && "🚗 Loading the latest automotive insights for you..."}
          {variant === 'default' && "🔧 Preparing your automotive experience..."}
        </p>
      </div>
    </div>
  );
}