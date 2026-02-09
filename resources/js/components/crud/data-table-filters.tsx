import { X } from 'lucide-react';
import DataTableFilterSelect from '@/components/crud/data-table-filter-select';
import DataTableSearch from '@/components/crud/data-table-search';
import { Button } from '@/components/ui/button';
import type { FilterConfig } from '@/types/crud';

interface DataTableFiltersProps {
    filters: FilterConfig[];
    currentSearch: string;
    currentFilters: Record<string, string>;
    onSearch: (value: string) => void;
    onFilter: (name: string, value: string) => void;
    onReset: () => void;
    resetLabel?: string;
}

export default function DataTableFilters({
    filters,
    currentSearch,
    currentFilters,
    onSearch,
    onFilter,
    onReset,
    resetLabel = 'Réinitialiser',
}: DataTableFiltersProps) {
    const hasActiveFilters = currentSearch || Object.values(currentFilters).some((v) => v);

    return (
        <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => {
                if (filter.type === 'search') {
                    return (
                        <DataTableSearch
                            key={filter.name}
                            value={currentSearch}
                            onChange={onSearch}
                            placeholder={filter.placeholder}
                        />
                    );
                }

                if (filter.type === 'select') {
                    return (
                        <DataTableFilterSelect
                            key={filter.name}
                            label={filter.label}
                            value={currentFilters[filter.name] ?? ''}
                            onChange={(value) => onFilter(filter.name, value)}
                            options={filter.options}
                        />
                    );
                }

                return null;
            })}

            {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={onReset}>
                    <X className="size-3.5" />
                    {resetLabel}
                </Button>
            )}
        </div>
    );
}
