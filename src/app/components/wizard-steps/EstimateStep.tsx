import { motion } from 'motion/react';
import { Clock, TrendingUp } from 'lucide-react';
import { Slider } from '../ui/slider';

interface EstimateStepProps {
  userEstimate: number;
  setUserEstimate: (estimate: number) => void;
  taskTitle: string;
}

export function EstimateStep({
  userEstimate,
  setUserEstimate,
  taskTitle,
}: EstimateStepProps) {
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const getEstimateLabel = (minutes: number) => {
    if (minutes <= 15) return {
      text: 'Quick task',
      color: 'text-green-600',
      bg: 'bg-green-50',
      gradient: 'from-green-500 to-emerald-500',
      emoji: '⚡'
    };
    if (minutes <= 60) return {
      text: 'Medium effort',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      gradient: 'from-blue-500 to-cyan-500',
      emoji: '💪'
    };
    if (minutes <= 120) return {
      text: 'Significant work',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      gradient: 'from-orange-500 to-amber-500',
      emoji: '🎯'
    };
    return {
      text: 'Major project',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      gradient: 'from-purple-500 to-pink-500',
      emoji: '🚀'
    };
  };

  const estimateLabel = getEstimateLabel(userEstimate);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gray-700" />
          <h3 className="text-xl font-semibold text-gray-900">
            How long will this take?
          </h3>
        </div>
        <p className="text-gray-600">
          Make your best estimate for: <span className="font-semibold text-gray-900">{taskTitle}</span>
        </p>
      </div>

      {/* Large time display */}
      <div className="text-center py-8">
        <motion.div
          key={userEstimate}
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="inline-flex flex-col items-center gap-4"
        >
          <div className="relative">
            <motion.div
              className={`text-7xl font-black bg-gradient-to-br ${estimateLabel.gradient} bg-clip-text text-transparent`}
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {formatTime(userEstimate)}
            </motion.div>
            <motion.div
              className={`absolute -inset-6 bg-gradient-to-r ${estimateLabel.gradient} opacity-20 rounded-3xl blur-2xl -z-10`}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          <motion.div
            className={`px-6 py-2.5 bg-gradient-to-r ${estimateLabel.gradient} rounded-full shadow-lg`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-base">{estimateLabel.emoji}</span>
              {estimateLabel.text}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Slider */}
      <div className="space-y-4">
        <Slider
          value={[userEstimate]}
          onValueChange={(value) => setUserEstimate(value[0])}
          min={5}
          max={240}
          step={5}
          className="py-4"
        />

        <div className="flex justify-between text-sm text-gray-500">
          <span>5 min</span>
          <span>4 hours</span>
        </div>
      </div>

      {/* Quick presets */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Quick presets:
        </p>
        <div className="grid grid-cols-4 gap-3">
          {[
            { value: 15, label: '15m', emoji: '⚡' },
            { value: 30, label: '30m', emoji: '💪' },
            { value: 60, label: '1h', emoji: '🎯' },
            { value: 120, label: '2h', emoji: '🚀' },
          ].map((preset, idx) => (
            <motion.button
              key={preset.value}
              onClick={() => setUserEstimate(preset.value)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + idx * 0.05, type: 'spring' }}
              className={`relative py-4 px-4 rounded-xl border-2 transition-all overflow-hidden ${
                userEstimate === preset.value
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
              }`}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {userEstimate === preset.value && (
                <motion.div
                  layoutId="preset-bg"
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                  initial={false}
                />
              )}
              <div className="relative z-10">
                <div className="text-xl mb-1">{preset.emoji}</div>
                <div className={`font-bold text-sm ${
                  userEstimate === preset.value ? 'text-purple-700' : 'text-gray-900'
                }`}>
                  {preset.label}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Helpful tip - Optimism Bias Warning */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden"
      >
        <div className="flex gap-3 p-5 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl shadow-sm">
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
          </motion.div>
          <div className="flex-1">
            <p className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
              💡 Optimism Bias Alert
            </p>
            <p className="text-sm text-blue-800 leading-relaxed">
              Research shows most people underestimate task duration by{' '}
              <span className="font-bold text-purple-700">20-40%</span>.
              Don't worry — our Sentinel AI will compare your estimate to historical data in the next step!
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
