import { Layers, LayoutGrid, Lock, Settings, Shield, Users } from 'lucide-react';
import { useLang } from '@/hooks/use-lang';
import { dashboard } from '@/routes/admin';
import { index as categoryIndex } from '@/routes/admin/category';
import { index as permissionIndex } from '@/routes/admin/permission';
import { index as roleIndex } from '@/routes/admin/role';
import type { NavGroup } from '@/types';

export function useAdminNavGroups(): NavGroup[] {
    const { __ } = useLang();

    return [
        {
            title: __('navigation.admin.groups.main'),
            items: [
                {
                    title: __('navigation.admin.nav.dashboard'),
                    href: dashboard().url,
                    icon: LayoutGrid,
                },
            ],
        },
        {
            title: __('navigation.admin.groups.catalog_management'),
            items: [
                {
                    title: __('navigation.admin.nav.categories'),
                    href: categoryIndex().url,
                    icon: Layers,
                },
            ],
        },
        {
            title: __('navigation.admin.groups.rights_management'),
            items: [
                {
                    title: __('navigation.admin.nav.users'),
                    href: '#',
                    icon: Users,
                },
                {
                    title: __('navigation.admin.nav.roles'),
                    href: roleIndex().url,
                    icon: Shield,
                },
                {
                    title: __('navigation.admin.nav.permissions'),
                    href: permissionIndex().url,
                    icon: Lock,
                },
            ],
        },
        {
            title: __('navigation.admin.groups.system'),
            items: [
                {
                    title: __('navigation.admin.nav.settings'),
                    href: '#',
                    icon: Settings,
                },
            ],
        },
    ];
}
