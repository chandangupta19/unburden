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
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
      <div className="glass-panel max-w-md w-full rounded-lg shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export const AlertDialogContent: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={'p-6 ' + className}>{children}</div>
);

export const AlertDialogHeader: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={'mb-4 ' + className}>{children}</div>
);

export const AlertDialogTitle: React.FC<BaseProps> = ({ children, className = '' }) => (
  <h2 className={'text-xl font-bold text-white mb-2 ' + className}>{children}</h2>
);

export const AlertDialogDescription: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={'text-sm text-white/70 ' + className}>{children}</div>
);

export const AlertDialogFooter: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={'flex justify-end space-x-2 mt-6 ' + className}>{children}</div>
);

export const AlertDialogAction: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  children, 
  className = '', 
  ...props 
}) => (
  <button 
    className={'px-4 py-2 bg-white/90 text-blue-600 rounded-lg hover:bg-white transition-colors ' + className}
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
    className={'px-4 py-2 text-white/70 hover:text-white transition-colors ' + className}
    {...props}
  >
    {children}
  </button>
);

export default AlertDialog;
