import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { SearchFilter } from '@/components/filters';
import { Button } from '@/components/ui/button';

interface DataTableFiltersProps {
    searchValue: string;
    onSearch: (value: string) => void;
    searchPlaceholder?: string;
    onReset: () => void;
    resetLabel?: string;
    hasActiveFilters?: boolean;
    children?: ReactNode;
}

export default function DataTableFilters({
    searchValue,
    onSearch,
    searchPlaceholder,
    onReset,
    resetLabel = 'Réinitialiser',
    hasActiveFilters = false,
    children,
}: DataTableFiltersProps) {
    const showReset = hasActiveFilters || !!searchValue;

    return (
        <div className="flex flex-wrap items-center gap-2">
            <SearchFilter
                value={searchValue}
                onChange={onSearch}
                placeholder={searchPlaceholder}
            />

            {children}

            {showReset && (
                <Button variant="ghost" size="sm" onClick={onReset}>
                    <X className="size-3.5" />
                    {resetLabel}
                </Button>
            )}
        </div>
    );
}
