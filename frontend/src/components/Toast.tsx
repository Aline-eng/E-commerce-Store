import React from 'react';
import { Toast, useToast } from '../context/ToastContext';

const toastTypeClasses = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
};

const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`max-w-xs w-full shadow-lg rounded-md pointer-events-auto ring-1 ring-black ring-opacity-5 mb-3 ${toastTypeClasses[toast.type]} px-4 py-3`}
    >
      {toast.message}
    </div>
  );
};

const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div
      aria-live="assertive"
      className="fixed top-5 right-5 z-50 flex flex-col items-end"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
