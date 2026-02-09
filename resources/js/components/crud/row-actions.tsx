import { Link } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { RowAction } from '@/types/crud';

interface RowActionsProps<T> {
    item: T;
    actions: RowAction<T>[];
}

export default function RowActions<T>({ item, actions }: RowActionsProps<T>) {
    const visibleActions = actions.filter((action) => !action.visible || action.visible(item));

    if (visibleActions.length === 0) {
        return null;
    }

    const defaultActions = visibleActions.filter((a) => a.variant !== 'destructive');
    const destructiveActions = visibleActions.filter((a) => a.variant === 'destructive');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">Actions</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {defaultActions.map((action, index) =>
                    action.href ? (
                        <DropdownMenuItem key={index} asChild>
                            <Link href={action.href(item)}>
                                {action.icon}
                                {action.label}
                            </Link>
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem
                            key={index}
                            onSelect={() => action.onClick?.(item)}
                        >
                            {action.icon}
                            {action.label}
                        </DropdownMenuItem>
                    ),
                )}

                {defaultActions.length > 0 && destructiveActions.length > 0 && <DropdownMenuSeparator />}

                {destructiveActions.map((action, index) =>
                    action.href ? (
                        <DropdownMenuItem key={index} variant="destructive" asChild>
                            <Link href={action.href(item)}>
                                {action.icon}
                                {action.label}
                            </Link>
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem
                            key={index}
                            variant="destructive"
                            onSelect={() => action.onClick?.(item)}
                        >
                            {action.icon}
                            {action.label}
                        </DropdownMenuItem>
                    ),
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
