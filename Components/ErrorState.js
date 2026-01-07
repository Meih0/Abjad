import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ANIMATION_VARIANTS } from '@/utils/constants';
import { parseApiError } from '@/utils/helpers';

/**
 * Reusable error state component
 * @param {Object} props
 * @param {Error} props.error - Error object
 * @param {Function} props.onRetry - Retry callback function
 * @param {string} props.title - Custom title
 * @param {boolean} props.showDetails - Whether to show error details
 */
export const ErrorState = ({
  error,
  onRetry,
  title = 'Something went wrong',
  showDetails = false,
  className = ''
}) => {
  const errorMessage = error ? parseApiError(error) : 'An unexpected error occurred';

  return (
    <motion.div
      {...ANIMATION_VARIANTS.fadeIn}
      className={`bg-white rounded-2xl p-12 text-center ${className}`}
    >
      <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="h-10 w-10 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{errorMessage}</p>

      {showDetails && error && process.env.NODE_ENV === 'development' && (
        <details className="mb-6 text-left bg-gray-50 p-4 rounded-lg max-w-md mx-auto">
          <summary className="cursor-pointer font-medium text-gray-700 mb-2">
            Error Details (Development Mode)
          </summary>
          <pre className="text-xs text-red-600 overflow-auto">
            {error.toString()}
          </pre>
        </details>
      )}

      {onRetry && (
        <Button
          size="lg"
          className="bg-gray-900 hover:bg-gray-800"
          onClick={onRetry}
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorState;
