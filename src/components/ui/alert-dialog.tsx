import React from 'react';

interface AlertDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({ 
  open, 
  onOpenChange, 
  children 
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        {children}
      </div>
    </div>
  );
};

export const AlertDialogContent: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export const AlertDialogHeader: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const AlertDialogTitle: React.FC<BaseProps> = ({ children, className = '' }) => (
  <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
);

export const AlertDialogDescription: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={`text-sm text-gray-600 ${className}`}>{children}</div>
);

export const AlertDialogFooter: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={`flex justify-end space-x-2 mt-4 ${className}`}>{children}</div>
);

export const AlertDialogAction: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  children, 
  className = '', 
  ...props 
}) => (
  <button 
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const AlertDialogCancel: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  children, 
  className = '', 
  ...props 
}) => (
  <button 
    className={`px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);
