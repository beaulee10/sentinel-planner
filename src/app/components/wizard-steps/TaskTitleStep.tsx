import { motion } from 'motion/react';
import { FileText, Tag } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface TaskTitleStepProps {
  taskTitle: string;
  setTaskTitle: (title: string) => void;
  category: string;
  setCategory: (category: string) => void;
}

const categories = [
  { id: 'work', label: 'Work', color: 'from-blue-500 to-blue-600', emoji: '💼', description: 'Professional tasks' },
  { id: 'personal', label: 'Personal', color: 'from-green-500 to-green-600', emoji: '🏠', description: 'Daily life' },
  { id: 'learning', label: 'Learning', color: 'from-purple-500 to-purple-600', emoji: '📚', description: 'Study & growth' },
  { id: 'health', label: 'Health', color: 'from-red-500 to-red-600', emoji: '❤️', description: 'Wellness' },
  { id: 'creative', label: 'Creative', color: 'from-pink-500 to-pink-600', emoji: '🎨', description: 'Projects & art' },
];

export function TaskTitleStep({
  taskTitle,
  setTaskTitle,
  category,
  setCategory,
}: TaskTitleStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-gray-700" />
          <h3 className="text-xl font-semibold text-gray-900">
            What would you like to accomplish?
          </h3>
        </div>
        <p className="text-gray-600 mb-4">
          Give your task a clear, specific title.
        </p>

        <div className="space-y-2">
          <Label htmlFor="task-title">Task Title</Label>
          <Input
            id="task-title"
            placeholder="e.g., Write quarterly report"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="text-lg h-14"
            autoFocus
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-gray-700" />
          <h3 className="text-xl font-semibold text-gray-900">
            Choose a category
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`relative p-5 rounded-2xl border-2 transition-all text-left ${
                category === cat.id
                  ? 'border-purple-500 shadow-xl bg-gradient-to-br from-white to-purple-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-md`}
                  animate={category === cat.id ? { rotate: [0, -5, 5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {cat.emoji}
                </motion.div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-0.5">{cat.label}</div>
                  <div className="text-xs text-gray-500">{cat.description}</div>
                </div>
              </div>

              {category === cat.id && (
                <motion.div
                  layoutId="category-indicator"
                  className="absolute top-3 right-3 w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                  initial={false}
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(168, 85, 247, 0.4)',
                      '0 0 0 6px rgba(168, 85, 247, 0)',
                    ],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
