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
