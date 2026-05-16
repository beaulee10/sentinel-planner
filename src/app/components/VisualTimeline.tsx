import { TimelineItem, TimelineItemData } from './TimelineItem';
import { Calendar, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface VisualTimelineProps {
  items: TimelineItemData[];
  onItemComplete: (id: string) => void;
  date?: string;
}

export function VisualTimeline({ items, onItemComplete, date }: VisualTimelineProps) {
  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header with celebration */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-lg border-2 border-white/40"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(52, 211, 153, 0)',
                  '0 0 0 10px rgba(52, 211, 153, 0.1)',
                  '0 0 0 0 rgba(52, 211, 153, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Calendar className="w-7 h-7 text-white" strokeWidth={2.5} />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Today's Journey
              </h2>
              {date && <p className="text-gray-600 font-medium">{date}</p>}
            </div>
          </div>

          <div className="text-right">
            <motion.p
              className="text-4xl font-black bg-gradient-to-r from-amber-500 to-emerald-500 bg-clip-text text-transparent"
              key={completedCount}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {completedCount}/{totalCount}
            </motion.p>
            <p className="text-sm text-gray-600 font-medium flex items-center gap-1 justify-end">
              <Sparkles className="w-4 h-4 text-amber-500" />
              completed
            </p>
          </div>
        </div>

        {/* Progress bar with gradient */}
        <div className="relative w-full h-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>

          {/* Progress percentage */}
          {progressPercentage > 15 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="text-xs font-bold text-white drop-shadow-md">
                {Math.round(progressPercentage)}%
              </span>
            </motion.div>
          )}
        </div>

        {/* Encouragement message */}
        {progressPercentage > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-center"
          >
            <p className="text-sm font-medium text-gray-600">
              {progressPercentage === 100 ? (
                <span className="text-emerald-600">🎉 Amazing! You completed everything today!</span>
              ) : progressPercentage >= 75 ? (
                <span className="text-emerald-600">💪 You're crushing it! Almost there!</span>
              ) : progressPercentage >= 50 ? (
                <span className="text-teal-600">✨ Great progress! Keep the momentum going!</span>
              ) : progressPercentage >= 25 ? (
                <span className="text-amber-600">🌟 Nice start! You're doing great!</span>
              ) : (
                <span className="text-sky-600">🌱 Every journey begins with a single step!</span>
              )}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Timeline */}
      <div className="space-y-0">
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            isLast={index === items.length - 1}
            onComplete={onItemComplete}
          />
        ))}
      </div>
    </div>
  );
}
