import DataTableSortHeader from '@/components/crud/data-table-sort-header';
import RowActions from '@/components/crud/row-actions';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { ColumnDef, RowAction } from '@/types/crud';

interface DataTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    actions?: RowAction<T>[];
    currentSort?: string;
    onSort?: (column: string) => void;
    keyExtractor: (item: T) => string;
    emptyMessage?: string;
}

export default function DataTable<T>({
    columns,
    data,
    actions,
    currentSort = '',
    onSort,
    keyExtractor,
    emptyMessage = 'Aucun résultat trouvé.',
}: DataTableProps<T>) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={String(column.key)} className={column.className}>
                            {column.sortable && onSort ? (
                                <DataTableSortHeader
                                    label={column.label}
                                    column={String(column.key)}
                                    currentSort={currentSort}
                                    onSort={onSort}
                                />
                            ) : (
                                column.label
                            )}
                        </TableHead>
                    ))}
                    {actions && actions.length > 0 && <TableHead className="w-12" />}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="h-24 text-center text-muted-foreground">
                            {emptyMessage}
                        </TableCell>
                    </TableRow>
                ) : (
                    data.map((item) => (
                        <TableRow key={keyExtractor(item)}>
                            {columns.map((column) => (
                                <TableCell key={String(column.key)} className={column.className}>
                                    {column.render ? column.render(item) : String((item as Record<string, unknown>)[String(column.key)] ?? '')}
                                </TableCell>
                            ))}
                            {actions && actions.length > 0 && (
                                <TableCell className="text-right">
                                    <RowActions item={item} actions={actions} />
                                </TableCell>
                            )}
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
