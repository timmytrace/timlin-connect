
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-md relative" role="alert">
      <strong className="font-bold font-cinzel">Oh no! An ancient curse (or an error):</strong>
      <span className="block sm:inline ml-2">{message}</span>
    </div>
  );
};

export default ErrorDisplay;
    