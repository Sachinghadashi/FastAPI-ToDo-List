import React from 'react';

const LoadingSpinner = ({ fullPage = false }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-accent/30 rounded-full"></div>
      </div>
      <span className="text-dark-muted font-medium text-sm animate-pulse">Loading...</span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-dark-bg flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
