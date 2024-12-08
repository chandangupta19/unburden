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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-bg-darker text-white rounded max-w-md w-full border border-accent modal-brutalist">
        {children}
      </div>
    </div>
  );
};

export const AlertDialogContent: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export const AlertDialogHeader: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={`mb-4 modal-brutalist-header ${className}`}>{children}</div>
);

export const AlertDialogTitle: React.FC<BaseProps> = ({ children, className = '' }) => (
  <h2 className={`text-xl font-bold text-white mb-2 ${className}`}>{children}</h2>
);

export const AlertDialogDescription: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={`text-sm text-text-light ${className}`}>{children}</div>
);

export const AlertDialogFooter: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={`flex justify-end space-x-2 mt-6 ${className}`}>{children}</div>
);

export const AlertDialogAction: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  children, 
  className = '', 
  ...props 
}) => (
  <button 
    className={`brutalist-button px-4 py-2 text-white ${className}`}
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
    className={`px-4 py-2 text-text-light hover:text-white transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default AlertDialog;
