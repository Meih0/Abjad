import { format, differenceInDays, isPast, isFuture } from 'date-fns';
import { DATE_FORMATS, ERROR_MESSAGES } from './constants';

/**
 * Format a date string for display
 * @param {string|Date} date - Date to format
 * @param {string} formatStr - Format string (defaults to DISPLAY format)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatStr = DATE_FORMATS.DISPLAY) => {
  if (!date) return 'N/A';
  try {
    return format(new Date(date), formatStr);
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date';
  }
};

/**
 * Get warranty status for an asset
 * @param {string} expiryDate - Warranty expiry date
 * @returns {Object|null} Warranty status with label and color
 */
export const getWarrantyStatus = (expiryDate) => {
  if (!expiryDate) return null;

  try {
    const expiry = new Date(expiryDate);
    const daysLeft = differenceInDays(expiry, new Date());

    if (isPast(expiry)) {
      return { label: 'Expired', color: 'bg-red-100 text-red-700 border-red-200' };
    } else if (daysLeft <= 30) {
      return { label: `${daysLeft} days left`, color: 'bg-amber-100 text-amber-700 border-amber-200' };
    } else {
      return { label: 'Active', color: 'bg-green-100 text-green-700 border-green-200' };
    }
  } catch (error) {
    console.error('Warranty status calculation error:', error);
    return null;
  }
};

/**
 * Calculate progress percentage
 * @param {number} completed - Number of completed items
 * @param {number} total - Total number of items
 * @returns {number} Progress percentage (0-100)
 */
export const calculateProgress = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncate = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Parse API error and return user-friendly message
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
export const parseApiError = (error) => {
  if (!error) return ERROR_MESSAGES.UNKNOWN_ERROR;

  if (error.message) return error.message;

  if (error.response) {
    const { status } = error.response;
    switch (status) {
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 500:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        return error.response.data?.message || ERROR_MESSAGES.UNKNOWN_ERROR;
    }
  }

  if (error.request) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  return ERROR_MESSAGES.UNKNOWN_ERROR;
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Whether phone is valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phone && phone.length >= 10 && phoneRegex.test(phone);
};

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Group array items by a key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

/**
 * Sort array by property
 * @param {Array} array - Array to sort
 * @param {string} property - Property to sort by
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted array
 */
export const sortBy = (array, property, order = 'asc') => {
  const sorted = [...array].sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return 'N/A';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} Whether object is empty
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Sanitize string for display
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeString = (str) => {
  if (!str) return '';
  return str
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Check if date is today
 * @param {string|Date} date - Date to check
 * @returns {boolean} Whether date is today
 */
export const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Get relative time string
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';

  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now - then) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

  return formatDate(date);
};

/**
 * Local storage helper with error handling
 */
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('localStorage get error:', error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('localStorage set error:', error);
      return false;
    }
  },

  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('localStorage remove error:', error);
      return false;
    }
  },

  clear: () => {
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.error('localStorage clear error:', error);
      return false;
    }
  }
};
