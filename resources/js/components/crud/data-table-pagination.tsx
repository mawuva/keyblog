import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import type { PaginatedData } from '@/types/crud';

interface DataTablePaginationProps<T> {
    data: PaginatedData<T>;
    summaryLabel?: (from: number, to: number, total: number) => string;
}

export default function DataTablePagination<T>({
    data,
    summaryLabel = (from, to, total) => `${from}–${to} sur ${total} résultats`,
}: DataTablePaginationProps<T>) {
    if (!data || data.last_page <= 1 || !Array.isArray(data.links)) {
        return null;
    }

    return (
        <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
                {summaryLabel(data.from, data.to, data.total)}
            </p>
            <div className="flex items-center gap-1">
                {data.links.map((link, index) => (
                    <Button
                        key={index}
                        variant={link.active ? 'default' : 'outline'}
                        size="sm"
                        disabled={!link.url}
                        asChild={!!link.url}
                        className="h-8 min-w-8"
                    >
                        {link.url ? (
                            <Link
                                href={link.url}
                                preserveState
                                preserveScroll
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        )}
                    </Button>
                ))}
            </div>
        </div>
    );
}
