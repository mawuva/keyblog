import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import DataTable from '@/components/crud/data-table';
import DataTableFilters from '@/components/crud/data-table-filters';
import DataTablePagination from '@/components/crud/data-table-pagination';
import { useLang } from '@/hooks/use-lang';
import { useQueryBuilder } from '@/hooks/use-query-builder';
import AdminLayout from '@/layouts/admin/admin-layout';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/permission';
import { index as permissionIndex } from '@/routes/admin/permission';
import type { ColumnDef, PaginatedData, Permission } from '@/types';

interface Props {
    items: PaginatedData<Permission>;
}

export default function PermissionIndex({ items }: Props) {
    const { url } = usePage();
    const { transFrom, transChoice, transCommon, transNavigation } = useLang();
    const t = (key: string) => transFrom('pages/admin/roles', `permission.${key}`);

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

    const columns: ColumnDef<Permission>[] = [
        { key: 'name', label: t('columns.name'), sortable: true },
    ];

    const breadcrumbs = [
        { title: transNavigation('nav.dashboard'), href: dashboard().url },
        { title: transNavigation('admin.nav.permissions'), href: permissionIndex().url },
    ];

    return (
        <AdminLayout headTags={{ title: t('title') }} breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
                    <p className="text-muted-foreground">{t('description')}</p>
                </div>

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
                    actions={[]}
                    currentSort={currentSort}
                    onSort={setSort}
                    keyExtractor={(item) => String(item.id)}
                    emptyMessage={transCommon('empty', { entity: transChoice('common.entity.permission', 1) })}
                />

                <DataTablePagination data={items} />
            </div>
        </AdminLayout>
    );
}
