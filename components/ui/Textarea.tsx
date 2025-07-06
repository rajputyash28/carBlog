import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical',
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };