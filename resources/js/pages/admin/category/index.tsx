import { usePage } from '@inertiajs/react';
import { ArrowRightLeft, Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import StatusBadge from '@/components/common/status-badge';
import DataTable from '@/components/crud/data-table';
import DataTableFilters from '@/components/crud/data-table-filters';
import DataTableHeader from '@/components/crud/data-table-header';
import DataTablePagination from '@/components/crud/data-table-pagination';
import DeleteDialog from '@/components/crud/delete-dialog';
import StatusChangeDialog from '@/components/crud/status-change-dialog';
import { useLang } from '@/hooks/use-lang';
import { useQueryBuilder } from '@/hooks/use-query-builder';
import AdminLayout from '@/layouts/admin/admin-layout';
import { changeStatus, create, destroy, edit, index } from '@/routes/admin/category';
import type { Category, ColumnDef, FilterConfig, PaginatedData, RowAction, StatusData } from '@/types';

interface Props {
    items: PaginatedData<Category>;
    statusOptions?: StatusData[];
}

export default function CategoryIndex({ items, statusOptions = [] }: Props) {
    const { url } = usePage();
    const { transFrom } = useLang();
    const t = (key: string) => transFrom('pages/admin/category', key);
    const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
    const [statusTarget, setStatusTarget] = useState<Category | null>(null);

    const params = useMemo(() => {
        const searchParams = new URLSearchParams(url.split('?')[1] ?? '');
        return {
            search: searchParams.get('filter[name]') ?? '',
            filters: {
                status: searchParams.get('filter[status]') ?? '',
            },
            sort: searchParams.get('sort') ?? '',
        };
    }, [url]);

    const { setSearch, setFilter, setSort, resetFilters, currentSort, currentSearch, currentFilters } = useQueryBuilder(
        index().url,
        params,
    );

    const columns: ColumnDef<Category>[] = [
        { key: 'name', label: t('columns.name'), sortable: true },
        { key: 'slug', label: t('columns.slug') },
        { key: 'order', label: t('columns.order'), sortable: true, className: 'w-20 text-center' },
        {
            key: 'status',
            label: t('columns.status'),
            render: (item) => <StatusBadge status={item.status} />,
        },
        { key: 'created_at_formatted', label: t('columns.created_at'), sortable: true, sortKey: 'created_at' },
    ];

    const actions: RowAction<Category>[] = [
        {
            label: t('actions.edit'),
            icon: <Pencil className="size-4" />,
            href: (item) => edit.url(item.id),
        },
        {
            label: t('actions.change_status'),
            icon: <ArrowRightLeft className="size-4" />,
            onClick: (item) => setStatusTarget(item),
        },
        {
            label: t('actions.delete'),
            icon: <Trash2 className="size-4" />,
            onClick: (item) => setDeleteTarget(item),
            variant: 'destructive',
        },
    ];

    const filters: FilterConfig[] = [
        { type: 'search', name: 'name', placeholder: t('filters.search') },
        ...(statusOptions.length > 0
            ? [{ type: 'select' as const, name: 'status', label: t('filters.all_statuses'), options: statusOptions }]
            : []),
    ];

    return (
        <AdminLayout headTags={{ title: t('title') }}>
            <div className="flex flex-col gap-6 p-4">
                <DataTableHeader
                    title={t('title')}
                    description={t('description')}
                    createRoute={create().url}
                    createLabel={t('actions.add')}
                />

                <DataTableFilters
                    filters={filters}
                    currentSearch={currentSearch}
                    currentFilters={currentFilters}
                    onSearch={setSearch}
                    onFilter={setFilter}
                    onReset={resetFilters}
                />

                <DataTable
                    columns={columns}
                    data={items.data}
                    actions={actions}
                    currentSort={currentSort}
                    onSort={setSort}
                    keyExtractor={(item) => item.id}
                    emptyMessage={t('empty')}
                />

                <DataTablePagination data={items} />

                <DeleteDialog
                    open={!!deleteTarget}
                    onClose={() => setDeleteTarget(null)}
                    deleteUrl={deleteTarget ? destroy.url(deleteTarget.id) : ''}
                    title={t('delete.title')}
                    description={t('delete.description')}
                    cancelLabel={t('delete.cancel')}
                    confirmLabel={t('delete.confirm')}
                />

                <StatusChangeDialog
                    open={!!statusTarget}
                    onClose={() => setStatusTarget(null)}
                    changeStatusUrl={statusTarget ? changeStatus.url(statusTarget.id) : ''}
                    statusOptions={statusOptions}
                    currentStatus={statusTarget?.status?.value}
                    title={t('status_change.title')}
                    description={t('status_change.description')}
                    cancelLabel={t('status_change.cancel')}
                    confirmLabel={t('status_change.confirm')}
                />
            </div>
        </AdminLayout>
    );
}
