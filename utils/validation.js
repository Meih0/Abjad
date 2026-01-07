import { VALIDATION } from './constants';

/**
 * Validation utility functions
 */

export const validators = {
  /**
   * Validate required field
   */
  required: (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} is required`;
    }
    return null;
  },

  /**
   * Validate minimum length
   */
  minLength: (value, min, fieldName = 'This field') => {
    if (value && value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return null;
  },

  /**
   * Validate maximum length
   */
  maxLength: (value, max, fieldName = 'This field') => {
    if (value && value.length > max) {
      return `${fieldName} must not exceed ${max} characters`;
    }
    return null;
  },

  /**
   * Validate email format
   */
  email: (value) => {
    if (!value) return null;
    if (!VALIDATION.EMAIL_REGEX.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  /**
   * Validate phone number
   */
  phone: (value) => {
    if (!value) return null;
    if (!VALIDATION.PHONE_REGEX.test(value) || value.length < 10) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  /**
   * Validate number range
   */
  numberRange: (value, min, max, fieldName = 'This field') => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return `${fieldName} must be a number`;
    }
    if (num < min || num > max) {
      return `${fieldName} must be between ${min} and ${max}`;
    }
    return null;
  },

  /**
   * Validate positive number
   */
  positiveNumber: (value, fieldName = 'This field') => {
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      return `${fieldName} must be a positive number`;
    }
    return null;
  },

  /**
   * Validate date is not in past
   */
  futureDate: (value, fieldName = 'This field') => {
    if (!value) return null;
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      return `${fieldName} cannot be in the past`;
    }
    return null;
  },

  /**
   * Validate URL format
   */
  url: (value) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  }
};

/**
 * Validate multiple fields
 * @param {Object} formData - Form data object
 * @param {Object} rules - Validation rules object
 * @returns {Object} Errors object
 */
export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const value = formData[field];

    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  });

  return errors;
};

/**
 * Check if form has any errors
 * @param {Object} errors - Errors object
 * @returns {boolean} Whether form has errors
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

/**
 * Sanitize input to prevent XSS
 * @param {string} input - Input string
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validate asset form data
 */
export const validateAsset = (data) => {
  return validateForm(data, {
    name: [
      (v) => validators.required(v, 'Asset name'),
      (v) => validators.minLength(v, VALIDATION.MIN_NAME_LENGTH, 'Asset name'),
      (v) => validators.maxLength(v, VALIDATION.MAX_NAME_LENGTH, 'Asset name')
    ],
    asset_type: [
      (v) => validators.required(v, 'Asset type')
    ],
    purchase_amount: [
      (v) => v ? validators.positiveNumber(v, 'Purchase amount') : null
    ]
  });
};

/**
 * Validate task form data
 */
export const validateTask = (data) => {
  return validateForm(data, {
    title: [
      (v) => validators.required(v, 'Task title'),
      (v) => validators.minLength(v, VALIDATION.MIN_NAME_LENGTH, 'Task title'),
      (v) => validators.maxLength(v, VALIDATION.MAX_NAME_LENGTH, 'Task title')
    ],
    task_type: [
      (v) => validators.required(v, 'Task type')
    ],
    due_date: [
      (v) => v ? validators.futureDate(v, 'Due date') : null
    ]
  });
};

/**
 * Validate service provider form data
 */
export const validateServiceProvider = (data) => {
  return validateForm(data, {
    name: [
      (v) => validators.required(v, 'Provider name'),
      (v) => validators.minLength(v, VALIDATION.MIN_NAME_LENGTH, 'Provider name')
    ],
    service_type: [
      (v) => validators.required(v, 'Service type')
    ],
    base_price: [
      (v) => validators.required(v, 'Base price'),
      (v) => validators.positiveNumber(v, 'Base price')
    ],
    email: [
      (v) => v ? validators.email(v) : null
    ],
    phone: [
      (v) => v ? validators.phone(v) : null
    ]
  });
};

/**
 * Validate booking form data
 */
export const validateBooking = (data) => {
  return validateForm(data, {
    scheduled_date: [
      (v) => validators.required(v, 'Scheduled date'),
      (v) => validators.futureDate(v, 'Scheduled date')
    ],
    scheduled_time: [
      (v) => validators.required(v, 'Scheduled time')
    ]
  });
};

export default validators;
