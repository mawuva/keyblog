import { Link } from '@inertiajs/react';
import { Layers, LayoutGrid, Lock, Settings, Shield, Users } from 'lucide-react';
import AppLogo from '@/components/logo/app-logo';
import { NavMain } from '@/components/navigation/nav-main';
import { NavUser } from '@/components/navigation/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useLang } from '@/hooks/use-lang';
import { dashboard } from '@/routes/admin';
import { index as categoryIndex } from '@/routes/admin/category';
import { index as permissionIndex } from '@/routes/admin/permission';
import { index as roleIndex } from '@/routes/admin/role';
import type { NavGroup } from '@/types';

export function AdminSidebar() {
    const { __ } = useLang();

    const navGroups: NavGroup[] = [
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
            title: __('navigation.admin.groups.management'),
            items: [
                {
                    title: __('navigation.admin.nav.categories'),
                    href: categoryIndex().url,
                    icon: Layers,
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
                {
                    title: __('navigation.admin.nav.users'),
                    href: '#',
                    icon: Users,
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

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain groups={navGroups} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
