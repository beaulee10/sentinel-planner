import { motion, AnimatePresence } from 'motion/react';
import { Task } from './TaskList';
import { Flame, CheckCircle2, Clock, Focus, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ExecutionModeProps {
  topTask: Task | null;
  onToggleTask: (taskId: string) => void;
  onExitExecutionMode: () => void;
}

export function ExecutionMode({ topTask, onToggleTask, onExitExecutionMode }: ExecutionModeProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval: number | undefined;
    if (isTimerActive) {
      interval = window.setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    if (topTask) {
      onToggleTask(topTask.id);
      setIsTimerActive(false);
      setTimeElapsed(0);
    }
  };

  if (!topTask) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center space-y-6">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl"
          >
            ✨
          </motion.div>
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-3">
              All Clear!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              No high-priority tasks remaining. Time to breathe.
            </p>
            <button
              onClick={onExitExecutionMode}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl transition-all"
            >
              Exit Execution Mode
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(168, 85, 247, 0)',
                '0 0 0 20px rgba(168, 85, 247, 0.1)',
                '0 0 0 0 rgba(168, 85, 247, 0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Focus className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
          </motion.div>

          <h1 className="text-5xl font-black text-white mb-3 drop-shadow-2xl">
            Execution Mode
          </h1>
          <p className="text-xl text-purple-200">
            One task. Total focus. Zero distractions.
          </p>

          <button
            onClick={onExitExecutionMode}
            className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all text-sm font-medium"
          >
            Exit Execution Mode
          </button>
        </motion.div>

        {/* Zen Timer */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-purple-300" />
                <span className="text-sm font-medium text-purple-200 uppercase tracking-wide">
                  Zen Timer
                </span>
              </div>
              <button
                onClick={() => {
                  setIsTimerActive(!isTimerActive);
                  if (!isTimerActive) {
                    setTimeElapsed(0);
                  }
                }}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  isTimerActive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                }`}
              >
                {isTimerActive ? 'Pause' : 'Start'}
              </button>
            </div>

            <div className="text-center py-6">
              <motion.div
                className="text-8xl font-black text-white mb-2 font-mono"
                animate={isTimerActive ? {
                  textShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.5)',
                    '0 0 40px rgba(168, 85, 247, 0.8)',
                    '0 0 20px rgba(168, 85, 247, 0.5)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {formatTime(timeElapsed)}
              </motion.div>
              <p className="text-sm text-purple-300">
                {isTimerActive ? 'Time in flow state' : 'Ready to begin'}
              </p>
            </div>

            {/* Timer visualization */}
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
              <AnimatePresence>
                {isTimerActive && (
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    exit={{ width: '0%' }}
                    transition={{ duration: 3600, ease: 'linear' }}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Next Win - Top Priority Task */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Your Next Win</h2>
          </div>

          <motion.div
            className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 shadow-2xl overflow-hidden"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(239, 68, 68, 0)',
                '0 0 60px 0 rgba(239, 68, 68, 0.6)',
                '0 0 0 0 rgba(239, 68, 68, 0)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 3px 3px, white 2px, transparent 0)',
                backgroundSize: '40px 40px',
              }} />
            </div>

            {/* Pulsing edge glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                boxShadow: 'inset 0 0 40px rgba(255, 255, 255, 0.3)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            {/* Content */}
            <div className="relative z-10 space-y-6">
              {/* Priority Badge */}
              <div className="flex items-center justify-between">
                <motion.div
                  className="flex items-center gap-3"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/40 shadow-xl">
                    <Flame className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white/90 uppercase tracking-wider mb-1 flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      CRITICAL PRIORITY
                    </div>
                    <div className="text-sm text-white/80 font-medium">
                      #1 on your list
                    </div>
                  </div>
                </motion.div>

                {topTask.dueDate && (
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                    <div className="text-xs text-white/80 font-medium">Due</div>
                    <div className="text-sm font-bold text-white">{topTask.dueDate}</div>
                  </div>
                )}
              </div>

              {/* Task Title */}
              <div>
                <h3 className="text-4xl font-black text-white leading-tight drop-shadow-lg">
                  {topTask.title}
                </h3>
              </div>

              {/* Action Button */}
              <motion.button
                onClick={handleComplete}
                className="w-full py-6 bg-white rounded-2xl font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 shadow-2xl relative overflow-hidden group"
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white to-gray-50"
                  whileHover={{
                    background: 'linear-gradient(to right, #fff, #f9fafb)',
                  }}
                />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" strokeWidth={3} />
                  Mark as Complete
                </span>
              </motion.button>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-xs text-white/80">Focus</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="text-xs text-white/80">Energy</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                  <div className="text-2xl mb-1">🔥</div>
                  <div className="text-xs text-white/80">Momentum</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Breathing reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mt-12 text-center"
        >
          <p className="text-purple-300 text-sm">
            🧘‍♀️ Remember to breathe • One thing at a time • You've got this
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
