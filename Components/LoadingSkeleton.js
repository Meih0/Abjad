import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable loading skeleton component
 */

export const SkeletonCard = ({ className = '' }) => (
  <div className={`bg-white rounded-xl p-6 animate-pulse ${className}`}>
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 bg-gray-200 rounded-xl" />
      <div className="flex-1 space-y-3">
        <div className="h-5 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-3/4 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

export const SkeletonList = ({ count = 3, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5, columns = 4 }) => (
  <div className="bg-white rounded-xl overflow-hidden">
    <div className="animate-pulse">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="border-b border-gray-100 p-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="h-4 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-gray-200 rounded"
        style={{ width: i === lines - 1 ? '80%' : '100%' }}
      />
    ))}
  </div>
);

export const SkeletonGrid = ({ count = 6, columns = 3 }) => (
  <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-${columns}`}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export const SkeletonAvatar = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`${sizeClasses[size]} bg-gray-200 rounded-full animate-pulse`} />
  );
};

export const SkeletonFloorPlan = () => (
  <div className="bg-white rounded-3xl p-6 animate-pulse">
    <div className="aspect-video bg-gray-200 rounded-xl" />
  </div>
);

export default SkeletonCard;
