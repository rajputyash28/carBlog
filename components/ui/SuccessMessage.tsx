import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

export default function SuccessMessage({ message, onClose }: SuccessMessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
      <CheckCircle size={20} className="flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:bg-green-600 rounded p-1 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}