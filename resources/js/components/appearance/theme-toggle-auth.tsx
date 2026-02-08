import { Moon, Sun } from 'lucide-react';
import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

type Props = Omit<
    ComponentProps<typeof Button>,
    'onClick' | 'children' | 'variant'
> & {
    displayVariant?: 'icon';
};

export default function ThemeToggleAuth({
    className = '',
    displayVariant = 'icon',
    ...props
}: Props) {
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
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
                {resolvedAppearance === 'dark' ? (
                    <Sun className="h-5 w-5" />
                ) : (
                    <Moon className="h-5 w-5" />
                )}
            </Button>
        );
    }

    return null;
}
