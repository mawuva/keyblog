import { router } from '@inertiajs/react';
import { query } from '@vortechron/query-builder-ts';
import { useCallback, useMemo } from 'react';

type QueryParams = {
    search?: string;
    filters?: Record<string, string>;
    sort?: string;
    page?: number;
    include?: string[];
};

export function useQueryBuilder(baseUrl: string, currentParams: QueryParams = {}, searchFilterName: string = 'name') {
    const buildUrl = useCallback(
        (params: QueryParams) => {
            const q = query(baseUrl);

            if (params.search) {
                q.filter(searchFilterName, params.search);
            }

            if (params.filters) {
                Object.entries(params.filters).forEach(([key, value]) => {
                    if (value) {
                        q.filter(key, value);
                    }
                });
            }

            if (params.sort) {
                q.sort(params.sort);
            }

            if (params.include && params.include.length > 0) {
                q.include(...params.include);
            }

            if (params.page && params.page > 1) {
                q.page(params.page);
            }

            return q.build();
        },
        [baseUrl, searchFilterName],
    );

    const navigate = useCallback(
        (params: Partial<QueryParams>) => {
            const merged = { ...currentParams, ...params };
            const url = buildUrl(merged);
            router.get(url, {}, { preserveState: true, preserveScroll: true });
        },
        [buildUrl, currentParams],
    );

    const setFilter = useCallback(
        (name: string, value: string) => {
            navigate({
                filters: { ...currentParams.filters, [name]: value },
                page: 1,
            });
        },
        [navigate, currentParams.filters],
    );

    const setSearch = useCallback(
        (value: string) => {
            navigate({ search: value, page: 1 });
        },
        [navigate],
    );

    const setSort = useCallback(
        (column: string) => {
            const currentSort = currentParams.sort;
            let newSort: string;

            if (currentSort === column) {
                newSort = `-${column}`;
            } else if (currentSort === `-${column}`) {
                newSort = '';
            } else {
                newSort = column;
            }

            navigate({ sort: newSort });
        },
        [navigate, currentParams.sort],
    );

    const setPage = useCallback(
        (page: number) => {
            navigate({ page });
        },
        [navigate],
    );

    const resetFilters = useCallback(() => {
        navigate({ filters: {}, search: '', page: 1 });
    }, [navigate]);

    const currentUrl = useMemo(() => buildUrl(currentParams), [buildUrl, currentParams]);

    return {
        currentUrl,
        navigate,
        setFilter,
        setSearch,
        setSort,
        setPage,
        resetFilters,
        currentSort: currentParams.sort ?? '',
        currentFilters: currentParams.filters ?? {},
        currentSearch: currentParams.search ?? '',
    };
}
