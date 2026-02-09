import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import DataTable from '@/components/crud/data-table';
import DataTableFilters from '@/components/crud/data-table-filters';
import DataTablePagination from '@/components/crud/data-table-pagination';
import { useLang } from '@/hooks/use-lang';
import { useQueryBuilder } from '@/hooks/use-query-builder';
import AdminLayout from '@/layouts/admin/admin-layout';
import { index } from '@/routes/admin/permission';
import type { ColumnDef, FilterConfig, PaginatedData, Permission } from '@/types';

interface Props {
    items: PaginatedData<Permission>;
}

export default function PermissionIndex({ items }: Props) {
    const { url } = usePage();
    const { transFrom } = useLang();
    const t = (key: string) => transFrom('pages/admin/permission', key);

    const params = useMemo(() => {
        const searchParams = new URLSearchParams(url.split('?')[1] ?? '');
        return {
            search: searchParams.get('filter[name]') ?? '',
            filters: {},
            sort: searchParams.get('sort') ?? '',
        };
    }, [url]);

    const { setSearch, setSort, resetFilters, currentSort, currentSearch, currentFilters } = useQueryBuilder(
        index().url,
        params,
    );

    const columns: ColumnDef<Permission>[] = [
        { key: 'name', label: t('columns.name'), sortable: true },
    ];

    const filters: FilterConfig[] = [
        { type: 'search', name: 'name', placeholder: t('filters.search') },
    ];

    return (
        <AdminLayout headTags={{ title: t('title') }}>
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
                    <p className="text-muted-foreground">{t('description')}</p>
                </div>

                <DataTableFilters
                    filters={filters}
                    currentSearch={currentSearch}
                    currentFilters={currentFilters}
                    onSearch={setSearch}
                    onFilter={() => {}}
                    onReset={resetFilters}
                />

                <DataTable
                    columns={columns}
                    data={items.data}
                    actions={[]}
                    currentSort={currentSort}
                    onSort={setSort}
                    keyExtractor={(item) => String(item.id)}
                    emptyMessage={t('empty')}
                />

                <DataTablePagination data={items} />
            </div>
        </AdminLayout>
    );
}
