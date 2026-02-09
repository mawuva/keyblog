export type * from './auth';
export type * from './crud';
export type * from './head';
export type * from './models';
export type * from './navigation';
export type * from './ui';

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
