export type * from './auth';
export type * from './crud';
export type * from './head';
export type * from './navigation';
export type * from './ui';

// Explicit exports from entities to avoid conflicts
export type { Category } from './entities/catalogs';
export type { Permission, Role, GroupedPermissions } from './entities/roles';
export type { AppUser } from './entities/users';

import type { Auth } from './auth';

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    flash?: { message?: string; level?: string } | null;
    locales?: Record<string, { native?: string; name?: string }>;
    currentLocale?: string;
    currentLocaleName?: string;
    [key: string]: unknown;
};
