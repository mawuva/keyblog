import type { PropsWithChildren } from 'react';
import FlashToaster from '@/components/feedback/flash-toaster';
import { AppHeadTags } from '@/components/layout/app-head-tags';
import PublicHeader from '@/components/public/public-header';
import type { HeadTags } from '@/types';

interface MemberLayoutProps extends PropsWithChildren {
    headTags?: HeadTags;
}

export default function MemberLayout({
    children,
    headTags,
}: MemberLayoutProps) {
    return (
        <>
            <AppHeadTags {...headTags} />
            <FlashToaster />
            
            <div className="min-h-screen bg-background">
                <PublicHeader />
                
                <main className="container mx-auto px-4 py-6">
                    {children}
                </main>
            </div>
        </>
    );
}
