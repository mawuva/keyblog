import { usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import DataTable from '@/components/crud/data-table';
import DataTableFilters from '@/components/crud/data-table-filters';
import DataTableHeader from '@/components/crud/data-table-header';
import DataTablePagination from '@/components/crud/data-table-pagination';
import DeleteDialog from '@/components/dialogs/delete-dialog';
import { useLang } from '@/hooks/use-lang';
import { useQueryBuilder } from '@/hooks/use-query-builder';
import AdminLayout from '@/layouts/admin/admin-layout';
import { transAction } from '@/lib/trans';
import { create, destroy, edit, index } from '@/routes/admin/role';
import type { ColumnDef, PaginatedData, Role, RowAction } from '@/types';

interface Props {
    items: PaginatedData<Role>;
}

export default function RoleIndex({ items }: Props) {
    const { url } = usePage();
    const { trans, transFrom, transChoice, transMsg, transCommon, transAct } = useLang();
    const t = (key: string) => transFrom('pages/admin/roles', `role.${key}`);
    const ta = (a: string) => transAction(trans, transChoice, a, 'role');
    const [deleteTarget, setDeleteTarget] = useState<Role | null>(null);

    const params = useMemo(() => {
        const searchParams = new URLSearchParams(url.split('?')[1] ?? '');
        return {
            search: searchParams.get('filter[name]') ?? '',
            filters: {},
            sort: searchParams.get('sort') ?? '',
        };
    }, [url]);

    const { setSearch, setSort, resetFilters, currentSort, currentSearch } = useQueryBuilder(
        index().url,
        params,
    );

    const columns: ColumnDef<Role>[] = [
        { key: 'name', label: t('columns.name'), sortable: true },
        { key: 'permissions_count', label: t('columns.permissions_count'), className: 'w-32 text-center' },
    ];

    const actions: RowAction<Role>[] = [
        {
            label: transAct('edit'),
            icon: <Pencil className="size-4" />,
            href: (item) => edit.url(item.id),
        },
        {
            label: transAct('delete'),
            icon: <Trash2 className="size-4" />,
            onClick: (item) => setDeleteTarget(item),
            variant: 'destructive',
        },
    ];

    return (
        <AdminLayout headTags={{ title: t('title') }}>
            <div className="flex flex-col gap-6 p-4">
                <DataTableHeader
                    title={t('title')}
                    description={t('description')}
                    createRoute={create().url}
                    createLabel={ta('add')}
                />

                <DataTableFilters
                    searchValue={currentSearch}
                    onSearch={setSearch}
                    searchPlaceholder={transCommon('filters.search')}
                    onReset={resetFilters}
                    resetLabel={transCommon('filters.reset')}
                />

                <DataTable
                    columns={columns}
                    data={items.data}
                    actions={actions}
                    currentSort={currentSort}
                    onSort={setSort}
                    keyExtractor={(item) => String(item.id)}
                    emptyMessage={transCommon('empty', { entity: transChoice('common.entity.role', 1) })}
                />

                <DataTablePagination data={items} />

                <DeleteDialog
                    open={!!deleteTarget}
                    onClose={() => setDeleteTarget(null)}
                    deleteUrl={deleteTarget ? destroy.url(deleteTarget.id) : ''}
                    title={transMsg('confirm.delete.title')}
                    description={transMsg('confirm.delete.description')}
                    cancelLabel={transAct('cancel')}
                    confirmLabel={transAct('delete')}
                />
            </div>
        </AdminLayout>
    );
}
