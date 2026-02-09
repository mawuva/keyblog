import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataTableSortHeaderProps {
    label: string;
    column: string;
    currentSort: string;
    onSort: (column: string) => void;
}

export default function DataTableSortHeader({ label, column, currentSort, onSort }: DataTableSortHeaderProps) {
    const isAsc = currentSort === column;
    const isDesc = currentSort === `-${column}`;

    return (
        <Button variant="ghost" size="sm" className="-ml-3 h-8" onClick={() => onSort(column)}>
            {label}
            {isAsc ? (
                <ArrowUp className="ml-1 size-3.5" />
            ) : isDesc ? (
                <ArrowDown className="ml-1 size-3.5" />
            ) : (
                <ArrowUpDown className="ml-1 size-3.5 opacity-50" />
            )}
        </Button>
    );
}
