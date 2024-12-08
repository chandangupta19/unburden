import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-bg-darker rounded border border-accent relative ${className}`}>
      {children}
      <div className="absolute left-0 top-0 w-4 h-[2px] bg-primary" />
      <div className="absolute right-0 top-0 w-4 h-[2px] bg-primary" />
      <div className="absolute left-0 bottom-0 w-4 h-[2px] bg-primary" />
      <div className="absolute right-0 bottom-0 w-4 h-[2px] bg-primary" />
    </div>
  );
};
