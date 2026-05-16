import { TrendingUp } from 'lucide-react';
import { Progress } from './ui/progress';

interface ProgressWidgetProps {
  completedTasks: number;
  totalTasks: number;
}

export function ProgressWidget({ completedTasks, totalTasks }: ProgressWidgetProps) {
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Today's Progress</h3>
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">{percentage}%</span>
        </div>
      </div>

      <Progress value={percentage} className="h-3 mb-3" />
      
      <p className="text-sm text-gray-600">
        <span className="font-semibold text-gray-900">{completedTasks}</span> of{' '}
        <span className="font-semibold text-gray-900">{totalTasks}</span> tasks completed
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-600 mb-1">Completed</p>
          <p className="text-xl font-semibold text-gray-900">{completedTasks}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-600 mb-1">Remaining</p>
          <p className="text-xl font-semibold text-gray-900">{totalTasks - completedTasks}</p>
        </div>
      </div>
    </div>
  );
}
