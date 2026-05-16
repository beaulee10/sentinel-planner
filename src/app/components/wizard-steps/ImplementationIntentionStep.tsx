import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Lightbulb, Sparkles, Brain } from 'lucide-react';
import { useState } from 'react';

interface ImplementationIntentionStepProps {
  taskTitle: string;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const timeAnchors = [
  { id: 'morning', label: 'First thing in the morning', emoji: '🌅', time: '8:00 AM' },
  { id: 'after-breakfast', label: 'Right after breakfast', emoji: '☕', time: '9:00 AM' },
  { id: 'mid-morning', label: 'Mid-morning (10-11 AM)', emoji: '🌤️', time: '10:30 AM' },
  { id: 'before-lunch', label: 'Before lunch', emoji: '🍱', time: '11:30 AM' },
  { id: 'after-lunch', label: 'After lunch', emoji: '🍽️', time: '1:00 PM' },
  { id: 'afternoon', label: 'Afternoon (2-4 PM)', emoji: '☀️', time: '3:00 PM' },
  { id: 'evening', label: 'Evening (6-8 PM)', emoji: '🌆', time: '7:00 PM' },
  { id: 'night', label: 'Before bed', emoji: '🌙', time: '9:00 PM' },
];

const locationAnchors = [
  { id: 'library', label: 'The Library', emoji: '📚', description: 'Quiet study space' },
  { id: 'desk', label: 'At my Desk', emoji: '🪑', description: 'Personal workspace' },
  { id: 'coffee-shop', label: 'Coffee Shop', emoji: '☕', description: 'Ambient focus' },
  { id: 'study-room', label: 'Study Room', emoji: '🎓', description: 'Dedicated space' },
  { id: 'bedroom', label: 'My Bedroom', emoji: '🛏️', description: 'Private space' },
  { id: 'classroom', label: 'Empty Classroom', emoji: '🏫', description: 'Academic setting' },
  { id: 'outdoor', label: 'Outdoors/Park', emoji: '🌳', description: 'Fresh air' },
  { id: 'home', label: 'At Home', emoji: '🏠', description: 'Comfortable space' },
];

export function ImplementationIntentionStep({
  taskTitle,
  selectedTime,
  setSelectedTime,
  selectedLocation,
  setSelectedLocation,
}: ImplementationIntentionStepProps) {
  const [showPreview, setShowPreview] = useState(false);

  const selectedTimeData = timeAnchors.find(t => t.id === selectedTime);
  const selectedLocationData = locationAnchors.find(l => l.id === selectedLocation);

  const hasSelection = selectedTime && selectedLocation;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(99, 102, 241, 0)',
                '0 0 0 10px rgba(99, 102, 241, 0.1)',
                '0 0 0 0 rgba(99, 102, 241, 0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Implementation Intention
            </h3>
            <p className="text-sm text-gray-500">Behavioral psychology for follow-through</p>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl">
          <div className="flex gap-3">
            <Lightbulb className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-indigo-900 mb-1">
                💡 Research shows this increases success rates by 2-3x
              </p>
              <p className="text-sm text-indigo-700">
                Specifying <span className="font-bold">when</span> and <span className="font-bold">where</span> you'll do a task makes it automatic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Selection */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-gray-700" />
          <h4 className="text-lg font-semibold text-gray-900">When will you do this?</h4>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Choose a time anchor that fits your routine
        </p>

        <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {timeAnchors.map((anchor, idx) => (
            <motion.button
              key={anchor.id}
              onClick={() => setSelectedTime(anchor.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                selectedTime === anchor.id
                  ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">{anchor.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold mb-0.5 ${
                    selectedTime === anchor.id ? 'text-indigo-900' : 'text-gray-900'
                  }`}>
                    {anchor.label}
                  </div>
                  <div className={`text-xs ${
                    selectedTime === anchor.id ? 'text-indigo-600' : 'text-gray-500'
                  }`}>
                    {anchor.time}
                  </div>
                </div>
              </div>

              {selectedTime === anchor.id && (
                <motion.div
                  layoutId="time-indicator"
                  className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center"
                  initial={false}
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Location Selection */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-gray-700" />
          <h4 className="text-lg font-semibold text-gray-900">Where will you do this?</h4>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Choose a location that supports focus
        </p>

        <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {locationAnchors.map((anchor, idx) => (
            <motion.button
              key={anchor.id}
              onClick={() => setSelectedLocation(anchor.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                selectedLocation === anchor.id
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">{anchor.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold mb-0.5 ${
                    selectedLocation === anchor.id ? 'text-purple-900' : 'text-gray-900'
                  }`}>
                    {anchor.label}
                  </div>
                  <div className={`text-xs ${
                    selectedLocation === anchor.id ? 'text-purple-600' : 'text-gray-500'
                  }`}>
                    {anchor.description}
                  </div>
                </div>
              </div>

              {selectedLocation === anchor.id && (
                <motion.div
                  layoutId="location-indicator"
                  className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                  initial={false}
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <AnimatePresence>
        {hasSelection && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-6 shadow-2xl overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }} />
              </div>

              {/* Animated glow */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-white uppercase tracking-wide">
                    Your Implementation Intention
                  </span>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border-2 border-white/30">
                  <p className="text-white text-lg font-semibold leading-relaxed">
                    <span className="opacity-90">"If it is </span>
                    <span className="font-black text-yellow-200">
                      {selectedTimeData?.label.toLowerCase()}
                    </span>
                    <span className="opacity-90"> and I am at </span>
                    <span className="font-black text-yellow-200">
                      {selectedLocationData?.label.toLowerCase()}
                    </span>
                    <span className="opacity-90">, then I will </span>
                    <span className="font-black text-yellow-200">
                      {taskTitle.toLowerCase()}
                    </span>
                    <span className="opacity-90">."</span>
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-4 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      {selectedTimeData?.emoji}
                    </div>
                    <span className="font-medium">{selectedTimeData?.time}</span>
                  </div>
                  <div className="w-px h-6 bg-white/30" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      {selectedLocationData?.emoji}
                    </div>
                    <span className="font-medium">{selectedLocationData?.description}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Success indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 grid grid-cols-3 gap-3"
            >
              {[
                { emoji: '🎯', label: 'Clear trigger' },
                { emoji: '🧠', label: 'Automatic habit' },
                { emoji: '✅', label: 'High success rate' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-green-50 border-2 border-green-200 rounded-xl p-3 text-center"
                >
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-xs font-semibold text-green-800">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
