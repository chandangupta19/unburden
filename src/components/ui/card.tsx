import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`glass-panel rounded-lg p-6 relative overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF3CAC] via-[#784BA0] to-[#2B86C5] opacity-50" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
