import { MoreHorizontal } from 'lucide-react';
import RowActions from '@/components/crud/row-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { ColumnDef, RowAction } from '@/types/crud';

interface DataCardProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    actions?: RowAction<T>[];
    keyExtractor: (item: T) => string;
    emptyMessage?: string;
}

export default function DataCard<T>({
    columns,
    data,
    actions,
    keyExtractor,
    emptyMessage = 'Aucun résultat trouvé.',
}: DataCardProps<T>) {
    if (data.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-8">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => (
                <Card key={keyExtractor(item)} className="p-3">
                    <CardHeader className="p-0 pb-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm leading-tight">
                                {columns[0].render 
                                    ? columns[0].render(item) 
                                    : String((item as Record<string, unknown>)[String(columns[0].key)] ?? '')
                                }
                            </h3>
                            {actions && actions.length > 0 && (
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                    >
                                        <MoreHorizontal className="h-3 w-3" />
                                    </Button>
                                    <RowActions item={item} actions={actions} />
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-1">
                        {columns.slice(1).map((column) => (
                            <div key={String(column.key)} className="flex justify-between text-xs">
                                <span className="text-muted-foreground">{column.label}:</span>
                                <span className={column.className}>
                                    {column.render 
                                        ? column.render(item) 
                                        : String((item as Record<string, unknown>)[String(column.key)] ?? '')
                                    }
                                </span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
