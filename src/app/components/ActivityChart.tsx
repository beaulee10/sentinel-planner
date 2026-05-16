import { BarChart3 } from 'lucide-react';

export function ActivityChart() {
  const weekData = [
    { day: 'Mon', tasks: 8, height: '60%' },
    { day: 'Tue', tasks: 12, height: '85%' },
    { day: 'Wed', tasks: 6, height: '45%' },
    { day: 'Thu', tasks: 14, height: '100%' },
    { day: 'Fri', tasks: 10, height: '70%' },
    { day: 'Sat', tasks: 4, height: '30%' },
    { day: 'Sun', tasks: 3, height: '20%' },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">Weekly Activity</h3>
      </div>

      <div className="flex items-end justify-between gap-2 h-32">
        {weekData.map((data) => (
          <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-gray-100 rounded-lg overflow-hidden relative h-full">
              <div 
                className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg transition-all duration-300"
                style={{ height: data.height }}
              />
            </div>
            <span className="text-xs text-gray-600">{data.day}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-xl">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">14 tasks</span> completed on Thursday 🎉
        </p>
      </div>
    </div>
  );
}
