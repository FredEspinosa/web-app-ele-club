import { motion } from 'framer-motion';

export default function AnimatedCheckCircle() {
  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
    >
      {/* Círculo sin relleno */}
      <motion.circle
        cx="14"
        cy="14"
        r="12"
        stroke="#3DCCBA"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.0, ease: 'easeInOut' }}
      />

      {/* Checkmark con trazo animado */}
      <motion.path
        d="M8 14L12 18L20 10"
        fill="none"
        stroke="#3DCCBA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
      />
    </motion.svg>
  );
}
