import { useState } from 'react';
import { BentoTile } from './components/BentoTile';
import { HighStressModeToggle } from './components/HighStressModeToggle';
import { TaskList, Task } from './components/TaskList';
import { StatsCard } from './components/StatsCard';
import { ProgressWidget } from './components/ProgressWidget';
import { QuickActions } from './components/QuickActions';
import { DateWidget } from './components/DateWidget';
import { UpcomingDeadlines } from './components/UpcomingDeadlines';
import { ActivityChart } from './components/ActivityChart';
import { CheckCircle2, ListTodo, Clock, Target } from 'lucide-react';
import { VisualTimeline } from './components/VisualTimeline';
import { TimelineItemData } from './components/TimelineItem';
import { TaskWizard, NewTask } from './components/TaskWizard';
import { Plus } from 'lucide-react';
import {
  BookOpen,
  Dumbbell,
  Coffee,
  Utensils,
  Laptop,
  Moon,
  Sun,
  Sandwich
} from 'lucide-react';
import { Button } from './components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { ExecutionMode } from './components/ExecutionMode';

const initialTasks: Task[] = [
  { id: '1', title: 'Review Q2 marketing strategy presentation', priority: 'high', completed: false, dueDate: 'Today, 2:00 PM' },
  { id: '2', title: 'Update project documentation for new features', priority: 'high', completed: false, dueDate: 'Today, 4:00 PM' },
  { id: '3', title: 'Schedule team 1:1 meetings for next week', priority: 'high', completed: false, dueDate: 'Tomorrow' },
  { id: '4', title: 'Respond to client feedback on wireframes', priority: 'medium', completed: false, dueDate: 'Tomorrow' },
  { id: '5', title: 'Review pull requests from team members', priority: 'medium', completed: false, dueDate: 'Apr 3' },
  { id: '6', title: 'Update team wiki with meeting notes', priority: 'medium', completed: true, dueDate: 'Today' },
  { id: '7', title: 'Order new office supplies', priority: 'low', completed: false, dueDate: 'Apr 5' },
  { id: '8', title: 'Research new design tools for team', priority: 'low', completed: false, dueDate: 'Apr 7' },
  { id: '9', title: 'Send birthday card to team member', priority: 'low', completed: true, dueDate: 'Yesterday' },
];

const upcomingDeadlines = [
  { id: '1', title: 'Marketing presentation', dueTime: 'Today at 2:00 PM', urgent: true },
  { id: '2', title: 'Project documentation', dueTime: 'Today at 4:00 PM', urgent: true },
  { id: '3', title: 'Client feedback review', dueTime: 'Tomorrow at 10:00 AM', urgent: false },
];

const initialTimelineItems: TimelineItemData[] = [
  {
    id: 't1',
    time: '7:00',
    duration: '1 hr',
    icon: Sun,
    color: 'text-amber-600',
    bgColor: 'bg-gradient-to-br from-amber-100 to-orange-100',
    completed: false,
  },
  {
    id: 't2',
    time: '8:00',
    duration: '30 min',
    icon: Coffee,
    color: 'text-amber-700',
    bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-50',
    completed: false,
  },
  {
    id: 't3',
    time: '9:00',
    duration: '2 hrs',
    icon: Laptop,
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
    completed: false,
  },
  {
    id: 't4',
    time: '12:00',
    duration: '45 min',
    icon: Utensils,
    color: 'text-green-600',
    bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
    completed: false,
  },
  {
    id: 't5',
    time: '14:00',
    duration: '1.5 hrs',
    icon: BookOpen,
    color: 'text-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-100 to-pink-100',
    completed: false,
  },
  {
    id: 't6',
    time: '16:00',
    duration: '1 hr',
    icon: Dumbbell,
    color: 'text-red-600',
    bgColor: 'bg-gradient-to-br from-red-100 to-pink-100',
    completed: false,
  },
  {
    id: 't7',
    time: '18:00',
    duration: '1 hr',
    icon: Sandwich,
    color: 'text-orange-600',
    bgColor: 'bg-gradient-to-br from-orange-100 to-amber-100',
    completed: false,
  },
  {
    id: 't8',
    time: '21:00',
    duration: '30 min',
    icon: Moon,
    color: 'text-indigo-600',
    bgColor: 'bg-gradient-to-br from-indigo-100 to-purple-100',
    completed: false,
  },
];

export default function App() {
  const [highStressMode, setHighStressMode] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [view, setView] = useState<'dashboard' | 'timeline'>('timeline');
  const [timelineItems, setTimelineItems] = useState<TimelineItemData[]>(initialTimelineItems);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleTimelineItemComplete = (itemId: string) => {
    setTimelineItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, completed: true } : item
      )
    );
  };

  const handleTaskCreated = (newTask: NewTask) => {
    console.log('New task created:', newTask);
    // You can add the task to your task list here
    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      priority: 'high',
      completed: false,
      dueDate: 'Today',
    };
    setTasks([...tasks, task]);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const activeCount = totalCount - completedCount;

  // Get top priority task for Execution Mode
  const topPriorityTask = tasks
    .filter(t => !t.completed)
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })[0] || null;

  // If High Stress Mode is active on Dashboard view, show Execution Mode
  if (highStressMode && view === 'dashboard') {
    return (
      <>
        <AnimatePresence>
          <ExecutionMode
            topTask={topPriorityTask}
            onToggleTask={toggleTask}
            onExitExecutionMode={() => setHighStressMode(false)}
          />
        </AnimatePresence>

        {/* Task Wizard */}
        {isWizardOpen && (
          <TaskWizard
            isOpen={isWizardOpen}
            onClose={() => setIsWizardOpen(false)}
            onTaskCreated={handleTaskCreated}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Morning Sunrise Mesh Gradient */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 relative overflow-hidden rounded-3xl"
        >
          {/* Mesh Gradient Background */}
          <div className="absolute inset-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFFACD]/80 via-[#F0FFF4]/70 to-[#E0F2FE]/80" />

            {/* Animated mesh orbs */}
            <motion.div
              className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#FFF9C4]/60 to-[#FFEB3B]/40 rounded-full blur-3xl"
              animate={{
                x: [0, 30, 0],
                y: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-[#C8E6C9]/50 to-[#A5D6A7]/40 rounded-full blur-3xl"
              animate={{
                x: [0, -20, 0],
                y: [0, 30, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <motion.div
              className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-br from-[#FFF59D]/50 to-[#FFEE58]/30 rounded-full blur-3xl"
              animate={{
                x: [0, 15, 0],
                y: [0, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
            <motion.div
              className="absolute top-1/2 right-1/4 w-56 h-56 bg-gradient-to-br from-[#B9F6CA]/40 to-[#69F0AE]/30 rounded-full blur-3xl"
              animate={{
                x: [0, -25, 0],
                y: [0, 15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />

            {/* Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="text-5xl">☀️</span>
                  </motion.div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-emerald-600 to-sky-600 bg-clip-text text-transparent mb-1">
                      {view === 'dashboard' ? 'Good Morning!' : 'Your Day Awaits'}
                    </h1>
                    <p className="text-lg text-gray-700 font-medium">
                      {view === 'dashboard'
                        ? "Let's make today amazing, one task at a time"
                        : 'Visual timeline designed for focus and flow'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* View Toggle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex gap-2 bg-white/70 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-white/60"
              >
                <motion.button
                  onClick={() => setView('timeline')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    view === 'timeline'
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-white/60'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Timeline View
                </motion.button>
                <motion.button
                  onClick={() => setView('dashboard')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    view === 'dashboard'
                      ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-white/60'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Dashboard View
                </motion.button>
              </motion.div>
            </div>

            {/* Inspirational subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 flex items-center gap-3 text-sm"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-white/60">
                <span className="text-lg">🌱</span>
                <span className="text-gray-700 font-medium">Progress over perfection</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-white/60">
                <span className="text-lg">✨</span>
                <span className="text-gray-700 font-medium">You've got this</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-white/60">
                <span className="text-lg">🎯</span>
                <span className="text-gray-700 font-medium">One step at a time</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Timeline View */}
        {view === 'timeline' && (
          <VisualTimeline
            items={timelineItems}
            onItemComplete={handleTimelineItemComplete}
            date="Thursday, April 2, 2026"
          />
        )}

        {/* Dashboard View */}
        {view === 'dashboard' && (
          <div className="grid grid-cols-4 gap-6 auto-rows-auto">
            {/* High Stress Mode Toggle - Prominent placement */}
            <BentoTile span={2} className="!p-0 overflow-hidden row-span-1">
              <HighStressModeToggle 
                isActive={highStressMode}
                onToggle={setHighStressMode}
              />
            </BentoTile>

            {/* Date Widget */}
            <BentoTile className="!p-0 overflow-hidden row-span-1">
              <DateWidget />
            </BentoTile>

            {/* Stats - Total Tasks */}
            <BentoTile className="row-span-1">
              <StatsCard 
                icon={ListTodo}
                label="Total Tasks"
                value={activeCount}
                color="blue"
              />
            </BentoTile>

            {/* Task List - Takes 2 columns */}
            <BentoTile span={2} className="row-span-2">
              <TaskList 
                tasks={tasks}
                highStressMode={highStressMode}
                onToggleTask={toggleTask}
              />
            </BentoTile>

            {/* Progress Widget */}
            <BentoTile span={2} className="row-span-1">
              <ProgressWidget 
                completedTasks={completedCount}
                totalTasks={totalCount}
              />
            </BentoTile>

            {/* Stats - Completed Today */}
            <BentoTile className="row-span-1">
              <StatsCard 
                icon={CheckCircle2}
                label="Completed"
                value={completedCount}
                color="green"
              />
            </BentoTile>

            {/* Stats - Upcoming */}
            <BentoTile className="row-span-1">
              <StatsCard 
                icon={Clock}
                label="Due Today"
                value={2}
                color="orange"
              />
            </BentoTile>

            {/* Quick Actions - Consolidated task entry */}
            <BentoTile span={2} className="row-span-1">
              <QuickActions onOpenWizard={() => setIsWizardOpen(true)} />
            </BentoTile>

            {/* Upcoming Deadlines */}
            <BentoTile span={2} className="row-span-1">
              <UpcomingDeadlines deadlines={upcomingDeadlines} />
            </BentoTile>

            {/* Activity Chart */}
            <BentoTile span={2} className="row-span-1">
              <ActivityChart />
            </BentoTile>

            {/* Focus Score */}
            <BentoTile span={2} className="row-span-1">
              <StatsCard
                icon={Target}
                label="Focus Score"
                value="94%"
                color="purple"
              />
            </BentoTile>
          </div>
        )}

        {/* Task Wizard */}
        {isWizardOpen && (
          <TaskWizard
            isOpen={isWizardOpen}
            onClose={() => setIsWizardOpen(false)}
            onTaskCreated={handleTaskCreated}
          />
        )}

        {/* Floating Action Button */}
        <motion.button
          onClick={() => setIsWizardOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white z-30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Plus className="w-8 h-8" strokeWidth={3} />
        </motion.button>
      </div>
    </div>
  );
}