import React from 'react';
import { Spin } from 'antd';

interface LoadingSpinnerProps {
  spinning?: boolean;
  children?: React.ReactNode;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ spinning = true, children }) => (
  <div className={`relative ${spinning ? 'min-h-[200px]' : ''}`}>
    <Spin
      spinning={spinning}
      size="large"
      className={`
        ${spinning ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10' : 'hidden'}
      `}
    />
    <div className={`${spinning ? 'opacity-50 pointer-events-none' : ''}`}>
      {children}
    </div>
  </div>
);

export default LoadingSpinner;