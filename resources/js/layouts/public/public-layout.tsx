import type { PropsWithChildren } from 'react';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import FlashToaster from '@/components/feedback/flash-toaster';
import ToasterComponent from '@/components/feedback/toaster';
import { AppHeadTags } from '@/components/layout/app-head-tags';
import PublicFooter from '@/components/public/public-footer';
import { PublicNavbar } from '@/components/public/public-navbar';
import { PublicTopbar } from '@/components/public/public-topbar';
import type { BreadcrumbItem, HeadTags } from '@/types';

interface PublicLayoutProps extends PropsWithChildren {
    headTags?: HeadTags;
    breadcrumbs?: BreadcrumbItem[];
    showBreadcrumbs?: boolean;
    showNavbar?: boolean;
    showFooter?: boolean;
}

export default function PublicLayout({
    children,
    headTags,
    breadcrumbs = [],
    showBreadcrumbs = true,
    showNavbar = true,
    showFooter = true,
}: PublicLayoutProps) {
    return (
        <>
            <AppHeadTags {...headTags} />
            <FlashToaster />
            <ToasterComponent />
            
            <div className="min-h-screen flex flex-col bg-background light">
                {showNavbar && (
                    <>
                        <PublicTopbar />
                        <PublicNavbar />
                    </>
                )}
                
                {showBreadcrumbs && breadcrumbs.length > 0 && (
                    <div className="container mx-auto px-4 py-4">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                )}
                
                <main className="flex-1 container mx-auto px-4 py-6">
                    {children}
                </main>
                
                {showFooter && <PublicFooter />}
            </div>
        </>
    );
}