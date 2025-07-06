import Link from 'next/link';
import { Car } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = false, className }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'bg-white rounded-full flex items-center justify-center',
        sizeClasses[size]
      )}>
        <Car size={iconSizes[size]} className="text-[#232536]" />
      </div>
      {showText && (
        <span className="font-bold text-lg text-white">CarBlog</span>
      )}
    </Link>
  );
}