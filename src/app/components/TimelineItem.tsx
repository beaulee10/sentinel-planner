import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { HapticButton } from './HapticButton';

export interface TimelineItemData {
  id: string;
  time: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  completed: boolean;
  duration?: string;
}

interface TimelineItemProps {
  item: TimelineItemData;
  isLast: boolean;
  onComplete: (id: string) => void;
}

export function TimelineItem({ item, isLast, onComplete }: TimelineItemProps) {
  const Icon = item.icon;

  return (
    <motion.div 
      className="relative flex gap-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[52px] top-[120px] w-1 h-full bg-gradient-to-b from-gray-300 to-transparent" />
      )}

      {/* Time */}
      <div className="w-20 pt-8 flex-shrink-0">
        <p className="text-2xl font-bold text-gray-900">{item.time}</p>
        {item.duration && (
          <p className="text-sm text-gray-500 mt-1">{item.duration}</p>
        )}
      </div>

      {/* Icon Circle */}
      <div className="flex-shrink-0 relative z-10">
        <motion.div
          className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg ${
            item.completed ? 'bg-gray-200' : item.bgColor
          } transition-all duration-300`}
          whileHover={{ scale: item.completed ? 1 : 1.05 }}
          animate={item.completed ? { scale: [1, 0.95, 1] } : {}}
        >
          <Icon 
            className={`w-12 h-12 ${item.completed ? 'text-gray-400' : item.color}`} 
            strokeWidth={2.5}
          />
        </motion.div>

        {item.completed && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pt-6 pb-12">
        <div className={`p-6 rounded-3xl border-2 transition-all duration-300 ${
          item.completed
            ? 'bg-gray-100/60 border-gray-200 backdrop-blur-sm'
            : 'bg-white/60 border-white/40 hover:border-white/60 shadow-lg backdrop-blur-xl hover:bg-white/70'
        }`}>
          {!item.completed && (
            <HapticButton onComplete={() => onComplete(item.id)} />
          )}
          
          {item.completed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-2"
            >
              <p className="text-lg font-semibold text-green-600">✓ Completed!</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
