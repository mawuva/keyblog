import type { InertiaLinkProps } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';

export type BreadcrumbItem = {
    title: string;
    href: string;
};

export type NavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
};

export type NavGroup = {
    title: string;
    items: NavItem[];
};

export interface DropdownItem extends Omit<NavItem, 'href' | 'icon'> {
    key: string;
    action: () => void;
    separator?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
}

export interface NavigationConfig {
    userDropdownItems: DropdownItem[];
}
