import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import type { AppLayoutProps, BreadcrumbItem, HeadTags } from '@/types';

type AdminLayoutProps = AppLayoutProps & {
    headTags?: HeadTags;
    breadcrumbs?: BreadcrumbItem[];
};

export default ({ children, breadcrumbs, ...props }: AdminLayoutProps) => (
    <AdminSidebarLayout breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AdminSidebarLayout>
);
