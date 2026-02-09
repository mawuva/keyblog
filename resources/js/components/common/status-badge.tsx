import { cn } from '@/lib/utils';
import type { StatusData } from '@/types/crud';

const colorMap: Record<string, string> = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
};

interface StatusBadgeProps {
    status: StatusData | null;
    className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
    if (!status) {
        return null;
    }

    const classes = colorMap[status.color] ?? colorMap.gray;

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
                classes,
                className,
            )}
        >
            {status.label}
        </span>
    );
}
