import React from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  isSubscribe?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, isSubscribe = false, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-[#FF5959] text-white hover:bg-[#e54545] focus:ring-[#FF5959]',
      secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-3 text-lg'
    };

    // Check if children contains "Subscribe" text
    const isSubscribeButton = isSubscribe || (typeof children === 'string' && children.toLowerCase().includes('subscribe'));

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
            Loading...
          </>
        ) : (
          <>
            {children}
            {isSubscribeButton && <Send size={15} className="ml-2" />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';