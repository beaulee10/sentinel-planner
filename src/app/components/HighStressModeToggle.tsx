import { Zap, ZapOff, Flame, Focus } from 'lucide-react';
import { Switch } from './ui/switch';
import { motion, AnimatePresence } from 'motion/react';

interface HighStressModeToggleProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

export function HighStressModeToggle({ isActive, onToggle }: HighStressModeToggleProps) {
  return (
    <motion.div
      layout
      className={`relative overflow-hidden transition-all duration-500 ${
        isActive
          ? 'bg-gradient-to-br from-red-500 via-orange-500 to-pink-500'
          : 'bg-gradient-to-br from-gray-100 to-gray-200'
      }`}
      animate={{
        boxShadow: isActive
          ? ['0 0 0 rgba(239, 68, 68, 0)', '0 0 30px rgba(239, 68, 68, 0.4)', '0 0 0 rgba(239, 68, 68, 0)']
          : '0 0 0 rgba(0, 0, 0, 0)',
      }}
      transition={{
        duration: 2,
        repeat: isActive ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >
      {/* Animated background pattern when active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 3px 3px, white 1.5px, transparent 0)',
              backgroundSize: '30px 30px',
            }}
          />
        )}
      </AnimatePresence>

      {/* Scanning light effect when active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ x: '-100%', opacity: 0.3 }}
            animate={{ x: '200%', opacity: 0.5 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 1,
            }}
            className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ filter: 'blur(20px)' }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className="flex items-center gap-3"
            animate={{
              scale: isActive ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: isActive ? Infinity : 0,
              ease: 'easeInOut',
            }}
          >
            <AnimatePresence mode="wait">
              {isActive ? (
                <motion.div
                  key="active"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg"
                >
                  <Focus className="w-6 h-6 text-white drop-shadow-lg" strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="inactive"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -180 }}
                  className="p-3 bg-white rounded-2xl shadow-sm"
                >
                  <ZapOff className="w-6 h-6 text-gray-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <Switch
            checked={isActive}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-white"
          />
        </div>

        <motion.div
          layout
          animate={{
            scale: isActive ? 1.02 : 1,
          }}
        >
          <h2
            className={`text-2xl font-semibold mb-2 transition-all ${
              isActive ? 'text-white drop-shadow-md' : 'text-gray-900'
            }`}
          >
            {isActive ? 'Execution Mode' : 'High Stress Mode'}
          </h2>
          <p
            className={`text-sm transition-all ${
              isActive ? 'text-white/95 drop-shadow' : 'text-gray-600'
            }`}
          >
            {isActive
              ? '🎯 Single-column focus • Next Win only • Zero distractions'
              : 'Toggle to enter Execution Mode with single-task focus'}
          </p>
        </motion.div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 space-y-3"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-2.5 h-2.5 bg-white rounded-full shadow-lg"
                />
                <span className="text-white/90 text-sm font-medium drop-shadow">
                  Execution Mode Active
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <p className="text-xs text-white/90 font-medium">
                  Entering single-task focus view...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
