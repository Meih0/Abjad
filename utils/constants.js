// Asset type configurations
export const ASSET_TYPE_ICONS = {
  ac: '❄️',
  fridge: '🧊',
  washing_machine: '🧺',
  dryer: '🌀',
  dishwasher: '🍽️',
  oven: '🔥',
  microwave: '📡',
  water_heater: '🚿',
  hvac: '🌡️',
  furniture: '🛋️',
  electronics: '📺',
  other: '📦'
};

export const ASSET_STATUS_COLORS = {
  active: 'bg-green-100 text-green-700 border-green-200',
  needs_maintenance: 'bg-amber-100 text-amber-700 border-amber-200',
  under_repair: 'bg-blue-100 text-blue-700 border-blue-200',
  replaced: 'bg-gray-100 text-gray-500 border-gray-200'
};

// Service type configurations
export const SERVICE_TYPE_ICONS = {
  plumbing: '🔧',
  electrical: '⚡',
  hvac: '❄️',
  cleaning: '🧹',
  appliance_repair: '🔌',
  pest_control: '🐜',
  landscaping: '🌿',
  painting: '🎨',
  general_maintenance: '🛠️'
};

export const SERVICE_TYPES = [
  { value: 'all', label: 'All Services' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'appliance_repair', label: 'Appliance Repair' },
  { value: 'pest_control', label: 'Pest Control' },
  { value: 'landscaping', label: 'Landscaping' },
  { value: 'painting', label: 'Painting' },
  { value: 'general_maintenance', label: 'General Maintenance' }
];

export const AVAILABILITY_COLORS = {
  available: 'bg-green-100 text-green-700 border-green-200',
  busy: 'bg-amber-100 text-amber-700 border-amber-200',
  offline: 'bg-gray-100 text-gray-500 border-gray-200'
};

// Task configurations
export const TASK_TYPE_ICONS = {
  cleaning: '🧹',
  maintenance: '🔧',
  repair: '🛠️',
  inspection: '🔍',
  delivery: '📦',
  other: '📋'
};

export const PRIORITY_COLORS = {
  low: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
  medium: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  high: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  urgent: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' }
};

export const TASK_STATUS_COLORS = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-gray-100 text-gray-600 border-gray-200'
};

// Room configurations
export const ROOM_COLORS = {
  bedroom: '#E8F4FD',
  bathroom: '#E3F2FD',
  kitchen: '#FFF3E0',
  living_room: '#F3E5F5',
  dining_room: '#E8F5E9',
  office: '#FFF8E1',
  garage: '#ECEFF1',
  storage: '#F5F5F5',
  laundry: '#E1F5FE',
  other: '#FAFAFA'
};

export const ROOM_STATUS_COLORS = {
  idle: 'bg-gray-100 text-gray-700 border-gray-200',
  occupied: 'bg-blue-100 text-blue-700 border-blue-200',
  maintenance: 'bg-orange-100 text-orange-700 border-orange-200',
  cleaning: 'bg-green-100 text-green-700 border-green-200'
};

// Maintenance intervals for different asset types (in days)
export const MAINTENANCE_INTERVALS = {
  ac: { days: 90, description: 'AC filter cleaning and inspection' },
  fridge: { days: 180, description: 'Refrigerator coil cleaning and check' },
  washing_machine: { days: 120, description: 'Washing machine maintenance' },
  dryer: { days: 90, description: 'Dryer vent cleaning' },
  dishwasher: { days: 180, description: 'Dishwasher inspection' },
  oven: { days: 180, description: 'Oven cleaning and inspection' },
  microwave: { days: 180, description: 'Microwave cleaning and check' },
  water_heater: { days: 365, description: 'Water heater flush and inspection' },
  hvac: { days: 180, description: 'HVAC system maintenance' }
};

// Brand color scheme
export const COLORS = {
  growth: '#005143',
  innovation: '#41E661',
  clarity: '#FEF5E8',
  depth: '#121B22'
};

// Animation variants
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  }
};

// API Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  ASSET_CREATED: 'Asset added successfully!',
  ASSET_UPDATED: 'Asset updated successfully!',
  ASSET_DELETED: 'Asset deleted successfully!',
  TASK_CREATED: 'Task created successfully!',
  TASK_UPDATED: 'Task updated successfully!',
  TASK_COMPLETED: 'Task marked as completed!',
  BOOKING_CREATED: 'Booking confirmed!',
  BOOKING_CANCELLED: 'Booking cancelled successfully!',
  ROOM_CREATED: 'Room created successfully!',
  ROOM_UPDATED: 'Room updated successfully!'
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM d, yyyy',
  INPUT: 'yyyy-MM-dd',
  TIMESTAMP: 'yyyy-MM-dd HH:mm:ss',
  TIME: 'HH:mm'
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
};

// Validation rules
export const VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_PRICE: 0,
  MAX_PRICE: 999999,
  PHONE_REGEX: /^[\d\s\-\+\(\)]+$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};
