import type { StatusData } from './crud';

export type Category = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    order: number;
    icon_type: string | null;
    icon_value: string | null;
    status: StatusData | null;
    created_at: string;
    updated_at: string;
    created_at_formatted: string;
};

export type Permission = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

export type Role = {
    id: number;
    name: string;
    permissions: Permission[];
    permissions_count: number;
    created_at: string;
    updated_at: string;
};

export type GroupedPermissions = Record<string, Permission[]>;
