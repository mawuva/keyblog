import { router } from '@inertiajs/react';
import { Clock, Search, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { useLang } from '@/hooks/use-lang';
import { type SearchContext, useSearchHistory } from '@/hooks/use-search-history';
import type { NavGroup } from '@/types';

interface CommandPaletteProps {
    context: SearchContext;
    groups: NavGroup[];
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({ context, groups, open: controlledOpen, onOpenChange }: CommandPaletteProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const { __ } = useLang();
    const { history, addEntry, removeEntry, clearHistory } = useSearchHistory(context);
    const [search, setSearch] = useState('');

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const setOpen = useCallback(
        (value: boolean) => {
            if (!value) {
                setSearch('');
            }
            if (isControlled) {
                onOpenChange?.(value);
            } else {
                setInternalOpen(value);
            }
        },
        [isControlled, onOpenChange],
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setOpen(!open);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, setOpen]);

    const allItems = useMemo(
        () =>
            groups.flatMap((group) =>
                group.items.map((item) => ({
                    ...item,
                    groupTitle: group.title,
                })),
            ),
        [groups],
    );

    const handleSelect = useCallback(
        (href: string, title: string) => {
            if (href && href !== '#') {
                addEntry(title);
                setOpen(false);
                router.visit(href);
            }
        },
        [addEntry, setOpen],
    );

    const handleHistorySelect = useCallback(
        (query: string) => {
            const match = allItems.find((item) => item.title.toLowerCase() === query.toLowerCase());
            if (match && match.href !== '#') {
                addEntry(match.title);
                setOpen(false);
                router.visit(match.href);
            }
        },
        [allItems, addEntry, setOpen],
    );

    const hasHistory = history.length > 0;
    const showHistory = hasHistory && !search;

    return (
        <CommandDialog
            open={open}
            onOpenChange={setOpen}
            title={__('navigation.command_palette.title')}
            description={__('navigation.command_palette.description')}
            showCloseButton={false}
        >
            <CommandInput
                placeholder={__('navigation.command_palette.placeholder')}
                value={search}
                onValueChange={setSearch}
            />
            <CommandList>
                <CommandEmpty>
                    <div className="flex flex-col items-center gap-2 py-4">
                        <Search className="text-muted-foreground size-8" />
                        <p className="text-muted-foreground text-sm">{__('navigation.command_palette.no_results')}</p>
                    </div>
                </CommandEmpty>

                {showHistory && (
                    <>
                        <CommandGroup
                            heading={
                                <div className="flex items-center justify-between">
                                    <span>{__('navigation.command_palette.recent_searches')}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            clearHistory();
                                        }}
                                        className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                                    >
                                        {__('navigation.command_palette.clear_history')}
                                    </button>
                                </div>
                            }
                        >
                            {history.map((query) => (
                                <CommandItem key={query} value={query} onSelect={() => handleHistorySelect(query)}>
                                    <Clock className="text-muted-foreground size-4" />
                                    <span className="flex-1">{query}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeEntry(query);
                                        }}
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <X className="size-3" />
                                    </button>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandSeparator />
                    </>
                )}

                {groups.map((group) => (
                    <CommandGroup key={group.title} heading={group.title}>
                        {group.items.map((item) => (
                            <CommandItem
                                key={item.title}
                                value={item.title}
                                onSelect={() => handleSelect(item.href as string, item.title)}
                                disabled={item.href === '#'}
                            >
                                {item.icon && <item.icon className="text-muted-foreground size-4" />}
                                <span>{item.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                ))}
            </CommandList>

            <div className="border-t px-3 py-2">
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <kbd className="bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">↑↓</kbd>
                            <span>navigate</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">↵</kbd>
                            <span>select</span>
                        </span>
                    </div>
                    <span className="flex items-center gap-1">
                        <kbd className="bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">esc</kbd>
                        <span>close</span>
                    </span>
                </div>
            </div>
        </CommandDialog>
    );
}
