import { Link } from '@inertiajs/react';
import { LayoutGrid, Settings, Users } from 'lucide-react';
import AppLogo from '@/components/logo/app-logo';
import { NavFooter } from '@/components/navigation/nav-footer';
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
import type { NavItem } from '@/types';

export function AdminSidebar() {
    const { __ } = useLang();

    const mainNavItems: NavItem[] = [
        {
            title: __('navigation.admin.nav.dashboard'),
            href: '/admin/dashboard',
            icon: LayoutGrid,
        },
        {
            title: __('navigation.admin.nav.users'),
            href: '/admin/users',
            icon: Users,
        },
        {
            title: __('navigation.admin.nav.settings'),
            href: '/admin/settings',
            icon: Settings,
        },
    ];

    const footerNavItems: NavItem[] = [];

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
