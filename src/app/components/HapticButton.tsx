import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';

interface HapticButtonProps {
  onComplete: () => void;
}

export function HapticButton({ onComplete }: HapticButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const scale = useMotionValue(1);
  const rotate = useTransform(scale, [1, 0.85], [0, -2]);

  const handleTapStart = () => {
    setIsPressed(true);
    scale.set(0.85);
  };

  const handleTapEnd = () => {
    setIsPressed(false);
    scale.set(1);
  };

  const handleComplete = () => {
    setShowConfetti(true);
    
    // Haptic feedback simulation with animation
    scale.set(0.85);
    setTimeout(() => scale.set(1.1), 100);
    setTimeout(() => scale.set(0.95), 200);
    setTimeout(() => scale.set(1), 300);
    
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div className="relative">
      {/* Confetti particles */}
      {showConfetti && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#3b82f6'][i % 5],
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0.5],
                x: Math.cos((i * Math.PI * 2) / 12) * 100,
                y: Math.sin((i * Math.PI * 2) / 12) * 100,
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          ))}
        </>
      )}

      <motion.button
        className={`relative w-full py-6 px-8 rounded-2xl font-bold text-lg overflow-hidden transition-colors ${
          isPressed
            ? 'bg-gradient-to-br from-green-600 to-emerald-600'
            : 'bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
        } text-white shadow-lg`}
        style={{ scale, rotate }}
        onTapStart={handleTapStart}
        onTap={handleComplete}
        onTapCancel={handleTapEnd}
        whileHover={{ scale: 1.02 }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />

        {/* Button content */}
        <div className="relative flex items-center justify-center gap-3">
          <motion.div
            animate={isPressed ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Check className="w-6 h-6" strokeWidth={3} />
          </motion.div>
          <span className="text-xl">Mark Complete</span>
          <Sparkles className="w-5 h-5" />
        </div>

        {/* Ripple effect on press */}
        {isPressed && (
          <motion.div
            className="absolute inset-0 bg-white rounded-2xl"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.button>

      {/* Shadow pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-green-500 -z-10 blur-xl"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
