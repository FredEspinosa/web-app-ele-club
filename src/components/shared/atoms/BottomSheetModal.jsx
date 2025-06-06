import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100vw',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 999,
};

const modalContainerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  backgroundColor: '#fff',
  zIndex: 9999,
  overflow: 'hidden',
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const sheetVariants = {
  hidden: { y: '100%' },
  visible: { y: 0 },
  exit: { y: '100%' },
};

export default function BottomSheetModal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            style={backdropStyle}
            onClick={onClose}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            style={modalContainerStyle}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sheetVariants}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
