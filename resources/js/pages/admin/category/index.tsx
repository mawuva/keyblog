import { usePage } from '@inertiajs/react';
import { ArrowRightLeft, Pencil, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import StatusBadge from '@/components/common/status-badge';
import DataTable from '@/components/crud/data-table';
import DataTableFilters from '@/components/crud/data-table-filters';
import DataTablePagination from '@/components/crud/data-table-pagination';
import DeleteDialog from '@/components/dialogs/delete-dialog';
import RestoreDialog from '@/components/dialogs/restore-dialog';
import StatusChangeDialog from '@/components/dialogs/status-change-dialog';
import { StatusFilter, TrashedFilter } from '@/components/filters';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/use-lang';
import { useQueryBuilder } from '@/hooks/use-query-builder';
import AdminLayout from '@/layouts/admin/admin-layout';
import { transAction } from '@/lib/trans';
import { changeStatus, destroy, forceDelete, index, restore } from '@/routes/admin/category';
import type { Category, ColumnDef, PaginatedData, RowAction, StatusData } from '@/types';
import CategoryFormDialog from './category-form-dialog';

interface Props {
    items: PaginatedData<Category>;
    statusOptions?: StatusData[];
}

export default function CategoryIndex({ items, statusOptions = [] }: Props) {
    const { url } = usePage();
    const { trans, transFrom, transChoice, transMsg, transCommon, transAct } = useLang();
    const t = (key: string) => transFrom('pages/admin/catalogs', `category.${key}`);
    const ta = (a: string) => transAction(trans, transChoice, a, 'category');

    const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
    const [restoreTarget, setRestoreTarget] = useState<Category | null>(null);
    const [forceDeleteTarget, setForceDeleteTarget] = useState<Category | null>(null);
    const [statusTarget, setStatusTarget] = useState<Category | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Category | null>(null);

    const params = useMemo(() => {
        const searchParams = new URLSearchParams(url.split('?')[1] ?? '');
        return {
            search: searchParams.get('filter[name]') ?? '',
            filters: {
                status: searchParams.get('filter[status]') ?? '',
                trashed: searchParams.get('filter[trashed]') ?? '',
            },
            sort: searchParams.get('sort') ?? '',
        };
    }, [url]);

    const { setSearch, setFilter, setSort, resetFilters, currentSort, currentSearch, currentFilters } = useQueryBuilder(
        index().url,
        params,
    );

    const hasActiveFilters = Object.values(currentFilters).some((v) => v);

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
            label: transAct('edit'),
            icon: <Pencil className="size-4" />,
            onClick: (item) => {
                setEditTarget(item);
                setFormOpen(true);
            },
            visible: (item) => !item.deleted_at,
        },
        {
            label: transAct('switch'),
            icon: <ArrowRightLeft className="size-4" />,
            onClick: (item) => setStatusTarget(item),
            visible: (item) => !item.deleted_at,
        },
        {
            label: transAct('delete'),
            icon: <Trash2 className="size-4" />,
            onClick: (item) => setDeleteTarget(item),
            variant: 'destructive',
            visible: (item) => !item.deleted_at,
        },
        {
            label: transAct('restore'),
            icon: <RotateCcw className="size-4" />,
            onClick: (item) => setRestoreTarget(item),
            visible: (item) => !!item.deleted_at,
        },
        {
            label: transAct('delete'),
            icon: <Trash2 className="size-4" />,
            onClick: (item) => setForceDeleteTarget(item),
            variant: 'destructive',
            visible: (item) => !!item.deleted_at,
        },
    ];

    const openCreateDialog = () => {
        setEditTarget(null);
        setFormOpen(true);
    };

    const closeFormDialog = () => {
        setFormOpen(false);
        setEditTarget(null);
    };

    return (
        <AdminLayout headTags={{ title: t('title') }}>
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">{t('title')}</h1>
                        <p className="text-sm text-muted-foreground">{t('description')}</p>
                    </div>
                    <Button onClick={openCreateDialog}>
                        <Plus className="size-4" />
                        {ta('add')}
                    </Button>
                </div>

                <DataTableFilters
                    searchValue={currentSearch}
                    onSearch={setSearch}
                    searchPlaceholder={transCommon('filters.search')}
                    onReset={resetFilters}
                    hasActiveFilters={hasActiveFilters}
                    resetLabel={transCommon('filters.reset')}
                >
                    <StatusFilter
                        value={currentFilters.status ?? ''}
                        onChange={(v) => setFilter('status', v)}
                        options={statusOptions}
                        allLabel={transCommon('filters.all_statuses')}
                    />
                    <TrashedFilter
                        value={currentFilters.trashed ?? ''}
                        onChange={(v) => setFilter('trashed', v)}
                        allLabel={transCommon('filters.without_trashed')}
                        withTrashedLabel={transCommon('filters.with_trashed')}
                        onlyTrashedLabel={transCommon('filters.only_trashed')}
                    />
                </DataTableFilters>

                <DataTable
                    columns={columns}
                    data={items.data}
                    actions={actions}
                    currentSort={currentSort}
                    onSort={setSort}
                    keyExtractor={(item) => item.id}
                    emptyMessage={transCommon('empty', { entity: transChoice('common.entity.category', 1) })}
                />

                <DataTablePagination data={items} />

                <CategoryFormDialog
                    open={formOpen}
                    onClose={closeFormDialog}
                    item={editTarget}
                />

                <DeleteDialog
                    open={!!deleteTarget}
                    onClose={() => setDeleteTarget(null)}
                    deleteUrl={deleteTarget ? destroy.url(deleteTarget.id) : ''}
                    title={transMsg('confirm.delete.title')}
                    description={transMsg('confirm.delete.description')}
                    cancelLabel={transAct('cancel')}
                    confirmLabel={transAct('delete')}
                />

                <DeleteDialog
                    open={!!forceDeleteTarget}
                    onClose={() => setForceDeleteTarget(null)}
                    deleteUrl={forceDeleteTarget ? forceDelete.url(forceDeleteTarget.id) : ''}
                    title={transMsg('confirm.force_delete.title')}
                    description={transMsg('confirm.force_delete.description')}
                    cancelLabel={transAct('cancel')}
                    confirmLabel={transAct('delete')}
                />

                <RestoreDialog
                    open={!!restoreTarget}
                    onClose={() => setRestoreTarget(null)}
                    restoreUrl={restoreTarget ? restore.url(restoreTarget.id) : ''}
                    title={transMsg('confirm.restore.title')}
                    description={transMsg('confirm.restore.description')}
                    cancelLabel={transAct('cancel')}
                    confirmLabel={transAct('restore')}
                />

                <StatusChangeDialog
                    open={!!statusTarget}
                    onClose={() => setStatusTarget(null)}
                    changeStatusUrl={statusTarget ? changeStatus.url(statusTarget.id) : ''}
                    statusOptions={statusOptions}
                    currentStatus={statusTarget?.status?.value}
                    title={transMsg('confirm.status_change.title')}
                    description={transMsg('confirm.status_change.description')}
                    cancelLabel={transAct('cancel')}
                    confirmLabel={transAct('confirm')}
                />
            </div>
        </AdminLayout>
    );
}
