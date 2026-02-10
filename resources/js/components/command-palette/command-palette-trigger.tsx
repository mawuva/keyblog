import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CommandPaletteTriggerProps {
    onClick: () => void;
    className?: string;
}

export function CommandPaletteTrigger({ onClick, className }: CommandPaletteTriggerProps) {
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={onClick}
            className={cn(
                'text-muted-foreground relative h-9 w-9 justify-start gap-2 px-2 md:w-auto md:px-3',
                className,
            )}
        >
            <Search className="size-4 shrink-0" />
            <span className="hidden md:inline-flex">
                <span className="text-xs">Search...</span>
            </span>
            <kbd className="bg-muted text-muted-foreground pointer-events-none ml-auto hidden h-5 items-center gap-0.5 rounded border px-1.5 font-mono text-[10px] font-medium md:inline-flex">
                <span className="text-xs">⌘</span>K
            </kbd>
        </Button>
    );
}
