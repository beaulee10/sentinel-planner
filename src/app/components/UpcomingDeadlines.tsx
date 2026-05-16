import { Clock, AlertCircle } from 'lucide-react';

interface Deadline {
  id: string;
  title: string;
  dueTime: string;
  urgent: boolean;
}

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

export function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">Upcoming</h3>
      </div>

      <div className="space-y-3">
        {deadlines.map((deadline) => (
          <div 
            key={deadline.id}
            className={`flex items-start gap-3 p-3 rounded-xl ${
              deadline.urgent 
                ? 'bg-red-50 border border-red-200' 
                : 'bg-gray-50'
            }`}
          >
            {deadline.urgent && (
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 mb-1">
                {deadline.title}
              </p>
              <p className={`text-xs ${deadline.urgent ? 'text-red-600' : 'text-gray-600'}`}>
                {deadline.dueTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
