import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onHide }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <div className='fixed top-28 right-[40%] z-50 flex items-center bg-gray-800 text-white px-6 py-4 rounded-lg shadow-lg border border-gray-700 animate-slide-up'>
      <div className='flex items-center'>
        <div className='shrink-0 mr-3'>
          <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
            <Check size={16} />
          </div>
        </div>
        <div>
          <p className='font-medium'>{message}</p>
        </div>
      </div>
    </div>
  );
};