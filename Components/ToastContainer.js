import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const TOAST_ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
};

const TOAST_STYLES = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
};

const ICON_STYLES = {
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-amber-600',
  info: 'text-blue-600'
};

export const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] max-w-sm w-full space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = TOAST_ICONS[toast.type] || Info;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              className={`${TOAST_STYLES[toast.type]} border rounded-xl shadow-lg p-4 pointer-events-auto`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${ICON_STYLES[toast.type]}`} />
                <p className="flex-1 text-sm font-medium">{toast.message}</p>
                <button
                  onClick={() => onRemove(toast.id)}
                  className="shrink-0 hover:opacity-70 transition-opacity"
                  aria-label="Close notification"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
