import React from 'react';

export default function GlassCard({ children, className = '', hoverEffect = false, ...props }) {
  return (
    <div
      className={`glass-card rounded-2xl p-6 ${hoverEffect ? 'glass-card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
