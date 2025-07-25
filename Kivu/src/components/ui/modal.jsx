import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children, title }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
        onClick={handleBackdropClick}
      >
        {/* Modal container */}
        <div 
          className="relative w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-robotoserif drop-shadow-sm">
                {title}
              </h2>
              
              <button
                onClick={onClose}
                className="group relative flex items-center justify-center w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 hover:scale-110"
                aria-label="Close modal"
              >
                <svg 
                  className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Header decoration */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 via-white/40 to-white/20"></div>
          </div>

          {/* Content */}
          <div className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-6">
            {/* Content wrapper */}
            <div className="relative z-10">
              {children}
            </div>

            {/* Subtle bottom decoration */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
