import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const colorStyles = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    text: 'text-blue-900',
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    text: 'text-green-900',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    text: 'text-purple-900',
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'text-orange-600',
    text: 'text-orange-900',
  },
};

export function StatsCard({ icon: Icon, label, value, color }: StatsCardProps) {
  const styles = colorStyles[color];

  return (
    <div className="flex items-start gap-4">
      <div className={`p-3 ${styles.bg} rounded-2xl`}>
        <Icon className={`w-6 h-6 ${styles.icon}`} />
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className={`text-2xl font-semibold ${styles.text}`}>{value}</p>
      </div>
    </div>
  );
}
