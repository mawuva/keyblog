import { Sun, Moon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGuestAppearance } from '@/hooks/use-guest-appearance';

interface ThemeToggleProps extends Omit<ComponentProps<typeof Button>, 'onClick' | 'children' | 'variant'> {
    displayVariant?: 'icon' | 'full';
}

export default function ThemeToggle({
    className = '',
    displayVariant = 'icon',
    ...props
}: ThemeToggleProps) {
    const { appearance, updateAppearance } = useGuestAppearance();

    const toggleTheme = () => {
        updateAppearance(appearance === 'dark' ? 'light' : 'dark');
    };

    if (displayVariant === 'icon') {
        return (
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={cn('h-9 w-9', className)}
                aria-label="Toggle theme"
                {...props}
            >
                {appearance === 'dark' ? (
                    <Sun className="h-5 w-5" />
                ) : (
                    <Moon className="h-5 w-5" />
                )}
            </Button>
        );
    }

    // Full variant with labels (for backward compatibility if needed)
    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)}>
            <button
                onClick={toggleTheme}
                className="flex items-center rounded-md px-3.5 py-1.5 transition-colors text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"
                aria-label="Toggle theme"
            >
                {appearance === 'dark' ? (
                    <Sun className="h-4 w-4" />
                ) : (
                    <Moon className="h-4 w-4" />
                )}
            </button>
        </div>
    );
}
