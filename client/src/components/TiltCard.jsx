import React from 'react';

export default function TiltCard({ children, className = '', style = {} }) {
  return (
    <div className={`tilt-card-wrapper ${className}`} style={style}>
      {children}
    </div>
  );
}
