import { useEffect } from 'react';
import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { AdminSidebarHeader } from '@/components/layout/admin-sidebar-header';
import { AppContent } from '@/components/layout/app-content';
import { AppHeadTags } from '@/components/layout/app-head-tags';
import { AppShell } from '@/components/layout/app-shell';
import { useAppearance } from '@/hooks/use-appearance';
import type { AppLayoutProps, BreadcrumbItem, HeadTags } from '@/types';

type AdminSidebarLayoutProps = AppLayoutProps & {
    headTags?: HeadTags;
    breadcrumbs?: BreadcrumbItem[];
};

export default function AdminSidebarLayout({
    children,
    headTags,
    breadcrumbs = [],
}: AdminSidebarLayoutProps) {
    const { appearance, updateAppearance } = useAppearance();

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        if (!window.location.pathname.startsWith('/admin')) {
            return;
        }

        if (appearance === 'system') {
            updateAppearance('light');
        }
    }, [appearance, updateAppearance]);

    return (
        <>
            <AppHeadTags {...headTags} />
            <AppShell variant="sidebar">
                <AdminSidebar />
                <AppContent variant="sidebar" className="overflow-x-hidden">
                    <AdminSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </AppContent>
            </AppShell>
        </>
    );
}
