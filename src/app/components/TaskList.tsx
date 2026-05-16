import { CheckCircle2, Zap, Flame, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Checkbox } from './ui/checkbox';

export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: string;
}

interface TaskListProps {
  tasks: Task[];
  highStressMode: boolean;
  onToggleTask: (taskId: string) => void;
}

const priorityColors = {
  high: 'text-red-500',
  medium: 'text-orange-500',
  low: 'text-blue-500',
};

const priorityBgColors = {
  high: 'bg-red-50',
  medium: 'bg-orange-50',
  low: 'bg-blue-50',
};

// Heatmap intensity configs for top 3 tasks
const heatmapConfigs = [
  {
    rank: 1,
    gradient: 'from-red-500 via-orange-500 to-amber-500',
    glowColor: 'shadow-[0_0_40px_rgba(239,68,68,0.6)]',
    ringColor: 'ring-red-500/30',
    textGlow: 'drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]',
    icon: Flame,
    label: 'CRITICAL',
  },
  {
    rank: 2,
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    glowColor: 'shadow-[0_0_30px_rgba(249,115,22,0.5)]',
    ringColor: 'ring-orange-500/30',
    textGlow: 'drop-shadow-[0_0_6px_rgba(249,115,22,0.4)]',
    icon: Zap,
    label: 'URGENT',
  },
  {
    rank: 3,
    gradient: 'from-amber-500 via-yellow-500 to-orange-400',
    glowColor: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]',
    ringColor: 'ring-amber-500/30',
    textGlow: 'drop-shadow-[0_0_4px_rgba(245,158,11,0.3)]',
    icon: AlertCircle,
    label: 'HIGH',
  },
];

export function TaskList({ tasks, highStressMode, onToggleTask }: TaskListProps) {
  // Sort tasks by priority and completion status
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // In high stress mode, show only top 3 incomplete tasks
  const displayTasks = highStressMode
    ? sortedTasks.filter(t => !t.completed).slice(0, 3)
    : sortedTasks;

  const hiddenTasksCount = highStressMode
    ? sortedTasks.filter(t => !t.completed).length - 3
    : 0;

  return (
    <motion.div
      layout
      className="space-y-4 h-full flex flex-col"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div layout className="flex items-center justify-between mb-6">
        <motion.h3
          layout
          className="text-xl font-semibold text-gray-900"
          animate={{
            scale: highStressMode ? 1.05 : 1,
            color: highStressMode ? '#dc2626' : '#111827',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {highStressMode ? '🔥 Priority Heatmap' : 'All Tasks'}
        </motion.h3>
        <motion.span
          layout
          className="text-sm text-gray-500"
          animate={{
            opacity: highStressMode ? 0.8 : 1,
          }}
        >
          {displayTasks.filter(t => !t.completed).length} active
        </motion.span>
      </motion.div>

      <motion.div layout className="space-y-3 flex-1">
        <AnimatePresence mode="popLayout">
          {displayTasks.map((task, index) => {
            const isHeatmapMode = highStressMode && index < 3;
            const heatmapConfig = isHeatmapMode ? heatmapConfigs[index] : null;
            const HeatIcon = heatmapConfig?.icon;

            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{
                  delay: index * 0.08,
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                }}
                className="relative"
              >
                {/* Heatmap Mode: Priority Task Card */}
                {isHeatmapMode && heatmapConfig ? (
                  <motion.div
                    className={`relative p-6 rounded-3xl overflow-hidden ${heatmapConfig.glowColor} ring-4 ${heatmapConfig.ringColor}`}
                    animate={{
                      boxShadow: [
                        heatmapConfig.glowColor.replace('shadow-', ''),
                        heatmapConfig.glowColor.replace('shadow-', '').replace(/0\.\d/g, (m) => String(parseFloat(m) * 1.3)),
                        heatmapConfig.glowColor.replace('shadow-', ''),
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${heatmapConfig.gradient} opacity-90`}
                      animate={{
                        opacity: [0.85, 0.95, 0.85],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Overlay pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '24px 24px',
                      }} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex items-start gap-4">
                      {/* Rank Badge */}
                      <motion.div
                        className="flex-shrink-0"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
                          <span className="text-3xl font-black text-white drop-shadow-lg">
                            {heatmapConfig.rank}
                          </span>
                        </div>
                      </motion.div>

                      {/* Task Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {HeatIcon && (
                            <motion.div
                              animate={{
                                rotate: [0, -5, 5, 0],
                              }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatDelay: 2,
                              }}
                            >
                              <HeatIcon className="w-5 h-5 text-white" strokeWidth={2.5} />
                            </motion.div>
                          )}
                          <span className={`text-xs font-black uppercase tracking-wider text-white ${heatmapConfig.textGlow}`}>
                            {heatmapConfig.label}
                          </span>
                        </div>
                        <p className="text-base font-semibold text-white leading-snug drop-shadow-md">
                          {task.title}
                        </p>
                        {task.dueDate && (
                          <p className="text-sm text-white/90 mt-2 font-medium drop-shadow">
                            ⏰ Due {task.dueDate}
                          </p>
                        )}
                      </div>

                      {/* Checkbox */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button
                          onClick={() => onToggleTask(task.id)}
                          className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/40 hover:bg-white/30 transition-colors flex items-center justify-center"
                        >
                          {task.completed && (
                            <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.5} />
                          )}
                        </button>
                      </motion.div>
                    </div>

                    {/* Pulsing edge glow */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        boxShadow: `inset 0 0 20px rgba(255,255,255,0.3)`,
                      }}
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.div>
                ) : (
                  /* Normal Mode: Standard Task Card */
                  <div
                    className={`flex items-start gap-3 p-4 rounded-2xl border transition-all ${
                      task.completed
                        ? 'bg-gray-50 border-gray-200'
                        : `${priorityBgColors[task.priority]} border-transparent`
                    }`}
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => onToggleTask(task.id)}
                      className="mt-1"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Flame className={`w-4 h-4 ${task.completed ? 'text-gray-400' : priorityColors[task.priority]}`} />
                        <span className={`text-xs font-medium uppercase tracking-wide ${
                          task.completed ? 'text-gray-400' : priorityColors[task.priority]
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                        {task.title}
                      </p>
                      {task.dueDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          Due {task.dueDate}
                        </p>
                      )}
                    </div>

                    {task.completed && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {hiddenTasksCount > 0 && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl text-center shadow-lg"
        >
          <p className="text-sm font-semibold text-white">
            ✨ {hiddenTasksCount} more {hiddenTasksCount === 1 ? 'task' : 'tasks'} hidden — focus on the top 3 first
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
