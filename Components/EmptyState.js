import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ANIMATION_VARIANTS } from '@/utils/constants';

/**
 * Reusable empty state component
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon component
 * @param {string} props.title - Title text
 * @param {string} props.description - Description text
 * @param {string} props.actionLabel - Action button label
 * @param {Function} props.onAction - Action button click handler
 * @param {boolean} props.showAction - Whether to show action button
 */
export const EmptyState = ({
  icon: Icon,
  title = 'No data found',
  description = 'Get started by creating your first item.',
  actionLabel = 'Get Started',
  onAction,
  showAction = true,
  className = ''
}) => {
  return (
    <motion.div
      {...ANIMATION_VARIANTS.fadeIn}
      className={`bg-white rounded-2xl p-12 text-center ${className}`}
    >
      {Icon && (
        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Icon className="h-10 w-10 text-gray-400" />
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      {showAction && onAction && (
        <Button
          size="lg"
          className="bg-gray-900 hover:bg-gray-800"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
