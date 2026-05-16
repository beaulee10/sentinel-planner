import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface BentoTileProps {
  children: ReactNode;
  className?: string;
  span?: number;
}

export function BentoTile({ children, className = '', span = 1 }: BentoTileProps) {
  const spanClass = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
  }[span] || 'col-span-1';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40 hover:shadow-xl hover:bg-white/70 transition-all duration-300 ${spanClass} ${className}`}
      whileHover={{ y: -2 }}
    >
      {children}
    </motion.div>
  );
}
