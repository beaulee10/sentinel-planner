import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, TrendingUp, AlertCircle, CheckCircle2, Info, Clock, Sparkles, Target } from 'lucide-react';
import { Button } from '../ui/button';

interface SentinelSuggestionStepProps {
  taskTitle: string;
  userEstimate: number;
  category: string;
  onFinish: (adjustedEstimate: number) => void;
}

// Detailed historical reference class data for different categories
const historicalData: Record<string, {
  averageMultiplier: number;
  taskCount: number;
  successRate: number;
  commonPitfalls: string[];
  insight: string;
  categoryLabel: string;
  avgUserEstimate: number; // in minutes
  avgActualTime: number; // in minutes
  examples: string[];
}> = {
  work: {
    averageMultiplier: 1.35,
    taskCount: 47,
    successRate: 78,
    commonPitfalls: ['Unexpected meetings', 'Email interruptions', 'Revision rounds'],
    insight: 'Work tasks typically expand due to stakeholder feedback and communication overhead',
    categoryLabel: 'Work Projects',
    avgUserEstimate: 120, // 2 hours
    avgActualTime: 162, // 2.7 hours
    examples: ['Quarterly reports', 'Client presentations', 'Team documentation']
  },
  personal: {
    averageMultiplier: 1.25,
    taskCount: 32,
    successRate: 82,
    commonPitfalls: ['Multitasking', 'Low energy', 'Distractions'],
    insight: 'Personal tasks often compete with other priorities and environmental distractions',
    categoryLabel: 'Personal Errands',
    avgUserEstimate: 60, // 1 hour
    avgActualTime: 75, // 1.25 hours
    examples: ['Grocery shopping', 'Home organization', 'Bill payments']
  },
  learning: {
    averageMultiplier: 1.5,
    taskCount: 28,
    successRate: 71,
    commonPitfalls: ['Concept complexity', 'Research rabbit holes', 'Practice time'],
    insight: 'Learning tasks require depth of understanding that\'s hard to predict upfront',
    categoryLabel: 'Coding Labs & Study',
    avgUserEstimate: 120, // 2 hours
    avgActualTime: 180, // 3 hours
    examples: ['Coding assignments', 'Research papers', 'Tutorial completion']
  },
  health: {
    averageMultiplier: 1.2,
    taskCount: 19,
    successRate: 85,
    commonPitfalls: ['Warm-up time', 'Cool-down', 'Prep and cleanup'],
    insight: 'Health activities include preparation and recovery time often underestimated',
    categoryLabel: 'Fitness & Wellness',
    avgUserEstimate: 45, // 45 min
    avgActualTime: 54, // 54 min
    examples: ['Gym sessions', 'Yoga classes', 'Meal prep']
  },
  creative: {
    averageMultiplier: 1.6,
    taskCount: 24,
    successRate: 68,
    commonPitfalls: ['Ideation time', 'Iteration cycles', 'Perfectionism'],
    insight: 'Creative work is inherently exploratory with unpredictable iteration needs',
    categoryLabel: 'Creative Projects',
    avgUserEstimate: 90, // 1.5 hours
    avgActualTime: 144, // 2.4 hours
    examples: ['Design mockups', 'Video editing', 'Writing blog posts']
  },
};

export function SentinelSuggestionStep({
  taskTitle,
  userEstimate,
  category,
  onFinish,
}: SentinelSuggestionStepProps) {
  const [selectedEstimate, setSelectedEstimate] = useState<'user' | 'suggested'>('suggested');
  const [showPitfalls, setShowPitfalls] = useState(false);
  const [recalibrateEnabled, setRecalibrateEnabled] = useState(false);

  const historical = historicalData[category] || {
    averageMultiplier: 1.3,
    taskCount: 30,
    successRate: 75,
    commonPitfalls: ['Unexpected complications', 'Setup time', 'Context switching'],
    insight: 'Most tasks take longer than initially estimated due to unforeseen factors',
    categoryLabel: 'General Tasks',
    avgUserEstimate: 60,
    avgActualTime: 78,
    examples: ['Various tasks', 'General activities', 'Mixed work']
  };

  const suggestedEstimate = Math.round(userEstimate * historical.averageMultiplier);
  const difference = suggestedEstimate - userEstimate;
  const percentageIncrease = Math.round(((suggestedEstimate - userEstimate) / userEstimate) * 100);

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const handleFinish = () => {
    const finalEstimate = selectedEstimate === 'user' ? userEstimate : suggestedEstimate;
    onFinish(finalEstimate);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header with Animation */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(168, 85, 247, 0)',
                  '0 0 0 10px rgba(168, 85, 247, 0.1)',
                  '0 0 0 0 rgba(168, 85, 247, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🧠 Sentinel Comparison
              </h3>
              <p className="text-sm text-gray-500">Reference Class Forecasting</p>
            </div>
          </div>

          <AnimatePresence>
            {recalibrateEnabled && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold">Auto-Calibrated</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-lg"
        >
          <p className="text-sm text-gray-700">
            📊 Based on <span className="font-bold text-purple-700">{historical.taskCount} similar {category} tasks</span>, here's your Mindful Uplift:
          </p>
        </motion.div>
      </motion.div>

      {/* Reality Check Banner */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden"
      >
        <div className="relative bg-gradient-to-br from-red-500 via-orange-500 to-amber-500 rounded-3xl p-6 shadow-2xl">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }} />
          </div>

          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(239, 68, 68, 0)',
                '0 0 40px 0 rgba(239, 68, 68, 0.4)',
                '0 0 0 0 rgba(239, 68, 68, 0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <motion.div
                className="flex items-center gap-3"
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white drop-shadow-lg">
                    ⚠️ Reality Check
                  </h4>
                  <p className="text-xs text-white/90 font-medium">
                    {historical.categoryLabel} Historical Data
                  </p>
                </div>
              </motion.div>

              {recalibrateEnabled && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold text-white">Enabled</span>
                </motion.div>
              )}
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              {/* Your Average Estimate */}
              <motion.div
                className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-xs text-white/80 font-medium mb-2 uppercase tracking-wide">
                  Your Avg Estimate
                </div>
                <div className="text-4xl font-black text-white mb-1 drop-shadow-lg">
                  {formatTime(historical.avgUserEstimate)}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/90">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <span>What you typically guess</span>
                </div>
              </motion.div>

              {/* Average Actual Time */}
              <motion.div
                className="bg-white rounded-2xl p-4 border-2 border-white shadow-xl"
                whileHover={{ scale: 1.02 }}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(255, 255, 255, 0.5)',
                    '0 0 0 8px rgba(255, 255, 255, 0)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="text-xs text-red-600 font-bold mb-2 uppercase tracking-wide flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Avg Actual Time
                </div>
                <div className="text-4xl font-black bg-gradient-to-br from-red-600 to-orange-600 bg-clip-text text-transparent mb-1">
                  {formatTime(historical.avgActualTime)}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-red-600 font-bold">
                  <AlertCircle className="w-3 h-3" />
                  <span>Reality (+{Math.round(((historical.avgActualTime - historical.avgUserEstimate) / historical.avgUserEstimate) * 100)}% longer)</span>
                </div>
              </motion.div>
            </div>

            {/* Gap Visualization */}
            <div className="mb-5 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/90 font-medium">Time Gap Analysis</span>
                <span className="text-xs text-white font-bold">
                  +{formatTime(historical.avgActualTime - historical.avgUserEstimate)} buffer needed
                </span>
              </div>
              <div className="relative h-8 bg-white/20 rounded-full overflow-hidden">
                {/* User estimate portion */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-end pr-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${(historical.avgUserEstimate / historical.avgActualTime) * 100}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                >
                  <span className="text-xs font-bold text-white drop-shadow">Estimate</span>
                </motion.div>

                {/* Gap portion */}
                <motion.div
                  className="absolute inset-y-0 bg-gradient-to-r from-red-400 to-orange-400 flex items-center justify-center"
                  initial={{ width: 0, left: `${(historical.avgUserEstimate / historical.avgActualTime) * 100}%` }}
                  animate={{ width: `${((historical.avgActualTime - historical.avgUserEstimate) / historical.avgActualTime) * 100}%` }}
                  transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
                  style={{ left: `${(historical.avgUserEstimate / historical.avgActualTime) * 100}%` }}
                >
                  <motion.span
                    className="text-xs font-black text-white drop-shadow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    +{Math.round(((historical.avgActualTime - historical.avgUserEstimate) / historical.avgUserEstimate) * 100)}%
                  </motion.span>
                </motion.div>
              </div>
            </div>

            {/* Example tasks */}
            <div className="mb-4 bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-white/80 mb-2 font-medium">Common {historical.categoryLabel}:</p>
              <div className="flex flex-wrap gap-2">
                {historical.examples.map((example, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium"
                  >
                    {example}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Recalibrate Button */}
            <motion.button
              onClick={() => {
                setRecalibrateEnabled(!recalibrateEnabled);
                if (!recalibrateEnabled) {
                  setSelectedEstimate('suggested');
                }
              }}
              className={`w-full py-4 rounded-2xl font-bold text-base transition-all shadow-xl ${
                recalibrateEnabled
                  ? 'bg-white text-orange-600'
                  : 'bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 hover:bg-white/30'
              }`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-3">
                {recalibrateEnabled ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
                    <span>Auto-Buffer Enabled for Future Tasks</span>
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5" strokeWidth={2.5} />
                    <span>Recalibrate My Schedule</span>
                  </>
                )}
              </span>
            </motion.button>

            {recalibrateEnabled && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-center text-xs text-white/90 font-medium"
              >
                ✅ Future {historical.categoryLabel.toLowerCase()} will automatically include a {Math.round((historical.averageMultiplier - 1) * 100)}% time buffer
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Dramatic Comparison Cards */}
      <motion.div
        className="grid grid-cols-2 gap-4"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* User Estimate - Optimistic */}
        <motion.button
          onClick={() => setSelectedEstimate('user')}
          className={`relative p-6 rounded-2xl border-2 transition-all text-left overflow-hidden ${
            selectedEstimate === 'user'
              ? 'border-blue-500 bg-blue-50 shadow-2xl'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Warning pulse effect for unselected */}
          {selectedEstimate === 'suggested' && (
            <motion.div
              className="absolute top-2 left-2"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertCircle className="w-5 h-5 text-amber-500" />
            </motion.div>
          )}

          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Optimistic Estimate
            </div>
            <div className="text-5xl font-black text-gray-900 mb-1">
              {formatTime(userEstimate)}
            </div>
            <div className="text-xs text-gray-500">Your initial guess</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
              <AlertCircle className="w-3 h-3" />
              <span>May underestimate by {percentageIncrease}%</span>
            </div>
          </div>

          {selectedEstimate === 'user' && (
            <motion.div
              layoutId="selection-indicator"
              className="absolute top-4 right-4 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
              initial={false}
            >
              <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </motion.button>

        {/* Suggested Estimate - Data-Driven */}
        <motion.button
          onClick={() => setSelectedEstimate('suggested')}
          className={`relative p-6 rounded-2xl border-2 transition-all text-left overflow-hidden ${
            selectedEstimate === 'suggested'
              ? 'border-purple-500 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 shadow-2xl'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Glow effect when selected */}
          {selectedEstimate === 'suggested' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          <div className="relative z-10 mb-4">
            <div className="text-xs text-purple-600 mb-2 uppercase tracking-wide font-bold flex items-center gap-1">
              <Target className="w-3 h-3" />
              Mindful Uplift
            </div>
            <div className="text-5xl font-black bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
              {formatTime(suggestedEstimate)}
            </div>
            <div className="text-xs text-purple-600 font-medium">
              +{formatTime(difference)} buffer
            </div>
          </div>

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded-lg font-medium">
              <Sparkles className="w-3 h-3" />
              <span>{historical.successRate}% success rate</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-pink-700 bg-pink-100 px-2 py-1 rounded-lg font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>Based on {historical.taskCount} tasks</span>
            </div>
          </div>

          {selectedEstimate === 'suggested' && (
            <motion.div
              layoutId="selection-indicator"
              className="absolute top-4 right-4 w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
              initial={false}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(168, 85, 247, 0.4)',
                  '0 0 0 8px rgba(168, 85, 247, 0)',
                  '0 0 0 0 rgba(168, 85, 247, 0)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Detailed Insight Box */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex gap-4">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Info className="w-6 h-6 text-white" />
          </motion.div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-2 text-lg">
              📊 Historical Analysis
            </h4>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
              {historical.insight}
            </p>

            <div className="mb-4 p-3 bg-white/60 rounded-xl border border-purple-200">
              <p className="text-xs text-gray-600 mb-2 font-medium">Reference Class Data:</p>
              <p className="text-sm text-gray-800">
                Over <span className="font-bold text-purple-700">{historical.taskCount} similar {category} tasks</span>, you typically needed{' '}
                <span className="font-bold text-pink-600">+{formatTime(difference)} more time</span> than initially estimated.
              </p>
            </div>

            {/* Visual comparison bars with animation */}
            <div className="space-y-3 mb-4">
              <motion.div
                className="space-y-1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-28 font-medium">Your estimate:</span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(userEstimate / suggestedEstimate) * 100}%` }}
                      transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-900 w-16 text-right">
                    {formatTime(userEstimate)}
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="space-y-1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-purple-600 w-28 font-bold">Suggested:</span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="text-xs font-bold text-purple-700 w-16 text-right">
                    {formatTime(suggestedEstimate)}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Common Pitfalls Toggle */}
            <button
              onClick={() => setShowPitfalls(!showPitfalls)}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 transition-colors"
            >
              {showPitfalls ? '▼' : '▶'} Common pitfalls that add time
            </button>

            <AnimatePresence>
              {showPitfalls && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-1.5">
                    {historical.commonPitfalls.map((pitfall, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2 text-xs text-gray-600 bg-white/60 px-3 py-2 rounded-lg"
                      >
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                        <span>{pitfall}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Benefits Cards */}
      <motion.div
        className="grid grid-cols-3 gap-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {[
          { emoji: '🎯', label: 'Realistic planning', color: 'from-blue-50 to-cyan-50', border: 'border-blue-200' },
          { emoji: '😌', label: 'Less stress', color: 'from-green-50 to-emerald-50', border: 'border-green-200' },
          { emoji: '✨', label: 'Better outcomes', color: 'from-purple-50 to-pink-50', border: 'border-purple-200' },
        ].map((benefit, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 + idx * 0.1 }}
            className={`p-4 bg-gradient-to-br ${benefit.color} rounded-xl border-2 ${benefit.border} text-center shadow-sm`}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.div
              className="text-2xl mb-1"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ delay: 1 + idx * 0.2, duration: 0.5 }}
            >
              {benefit.emoji}
            </motion.div>
            <div className="text-xs font-medium text-gray-700">{benefit.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Button */}
      <motion.div
        className="pt-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          onClick={handleFinish}
          className="w-full h-16 text-lg gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 shadow-xl hover:shadow-2xl transition-all"
        >
          {selectedEstimate === 'suggested' ? (
            <>
              <Brain className="w-6 h-6" />
              <span>Create with {formatTime(suggestedEstimate)}</span>
              <span className="px-2 py-1 bg-white/20 rounded-lg text-xs">Recommended</span>
            </>
          ) : (
            <>
              <Clock className="w-6 h-6" />
              <span>Create with {formatTime(userEstimate)}</span>
            </>
          )}
        </Button>

        <AnimatePresence>
          {selectedEstimate === 'user' && !recalibrateEnabled && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 p-3 bg-amber-50 border-2 border-amber-300 rounded-xl text-center"
            >
              <p className="text-xs text-amber-900 font-bold">
                ⚠️ Proceeding with optimistic estimate may lead to scheduling conflicts
              </p>
            </motion.div>
          )}

          {selectedEstimate === 'user' && recalibrateEnabled && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 p-3 bg-red-50 border-2 border-red-300 rounded-xl text-center"
            >
              <p className="text-xs text-red-900 font-bold flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Warning: You've enabled auto-buffer but selected your original estimate. Consider using the suggested time!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedEstimate === 'suggested' && !recalibrateEnabled && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-center text-purple-600 mt-3 font-medium"
          >
            ✅ Following data-driven recommendation for {historical.successRate}% success rate
          </motion.p>
        )}

        {selectedEstimate === 'suggested' && recalibrateEnabled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl"
          >
            <p className="text-sm text-green-900 font-bold text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Perfect! Using suggested time + auto-buffer enabled for future {historical.categoryLabel.toLowerCase()}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
