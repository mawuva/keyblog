import type { PropsWithChildren } from 'react';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import FlashToaster from '@/components/feedback/flash-toaster';
import { AppHeadTags } from '@/components/layout/app-head-tags';
import { PublicAuthBanner } from '@/components/public/public-auth-banner';
import PublicFooter from '@/components/public/public-footer';
import PublicHeader from '@/components/public/public-header';
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

            {/* Toast Component */}
            <FlashToaster />

            <div className="light flex min-h-screen flex-col bg-background">
                {showNavbar && <PublicHeader />}

                {showBreadcrumbs && breadcrumbs.length > 0 && (
                    <div className="container mx-auto px-4 py-4">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                )}

                <main className="container mx-auto flex-1 px-4 py-6">
                    {children}
                </main>

                {showFooter && <PublicFooter />}
            </div>

            <PublicAuthBanner />
        </>
    );
}
