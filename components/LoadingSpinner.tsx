
import React from 'react';

interface LoadingSpinnerProps {
  size?: string;
  color?: string;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'w-12 h-12', color = 'border-amber-500', message }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className={`animate-spin rounded-full ${size} border-t-4 border-b-4 ${color}`}></div>
      {message && <p className="text-slate-300 text-sm">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
    