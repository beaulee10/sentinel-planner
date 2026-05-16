import { Plus, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface QuickActionsProps {
  onOpenWizard: () => void;
}

export function QuickActions({ onOpenWizard }: QuickActionsProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [quickInput, setQuickInput] = useState('');

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickInput.trim()) {
      // For quick input, open the wizard with pre-filled title
      onOpenWizard();
      setQuickInput('');
    }
  };

  return (
    <motion.div
      className="relative h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-3">
        <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Quick Add
        </h3>
      </div>

      <form onSubmit={handleQuickAdd} className="flex-1 flex flex-col justify-center">
        <div className="relative">
          <motion.div
            className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
              isFocused
                ? 'bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg ring-2 ring-blue-200'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            animate={{
              scale: isFocused ? 1.02 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="What needs doing?"
              className="w-full px-4 py-3.5 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 text-sm"
            />

            <AnimatePresence>
              {quickInput.trim() && (
                <motion.button
                  type="submit"
                  initial={{ opacity: 0, scale: 0.8, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 10 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <Plus className="w-4 h-4" strokeWidth={2.5} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {!quickInput && !isFocused && (
              <motion.button
                type="button"
                onClick={onOpenWizard}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-xs text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                or use full wizard
                <Sparkles className="w-3 h-3" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>
    </motion.div>
  );
}
