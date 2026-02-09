import type { ReactNode } from 'react';

export type PaginatedData<T> = {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type StatusData = {
    value: string;
    label: string;
    color: string;
};

export type ColumnDef<T> = {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    sortKey?: string;
    render?: (item: T) => ReactNode;
    className?: string;
};

export type RowAction<T> = {
    label: string;
    icon?: ReactNode;
    href?: (item: T) => string;
    onClick?: (item: T) => void;
    variant?: 'default' | 'destructive';
    visible?: (item: T) => boolean;
};

export type FilterConfig = SearchFilterConfig | SelectFilterConfig;

export type SearchFilterConfig = {
    type: 'search';
    name: string;
    placeholder?: string;
};

export type SelectFilterConfig = {
    type: 'select';
    name: string;
    label: string;
    options: { value: string; label: string }[];
};
