import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import FlashToaster from '@/components/feedback/flash-toaster';
import ToasterComponent from '@/components/feedback/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import type { SharedData } from '@/types';

type Props = {
    children: ReactNode;
    variant?: 'header' | 'sidebar';
};

export function AppShell({ children, variant = 'header' }: Props) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return (
            <>
                <ToasterComponent />
                <FlashToaster />
                <div className="flex min-h-screen w-full flex-col">{children}</div>
            </>
        );
    }

    return (
        <>
            <ToasterComponent />
            <FlashToaster />
            <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>
        </>
    );
}
