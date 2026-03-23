"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 ml-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-on-background/40 backdrop-blur-md"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl shadow-on-background/20"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
              <h2 className="text-2xl font-black font-headline text-on-background tracking-tight italic uppercase italic">
                {title}
              </h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-all active:scale-90"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-8 lg:p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
