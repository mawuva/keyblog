import { useState } from 'react';
import ThemeToggleAuth from '@/components/appearance/theme-toggle-auth';
import { CommandPalette } from '@/components/command-palette/command-palette';
import { CommandPaletteTrigger } from '@/components/command-palette/command-palette-trigger';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import LangSwitcher from '@/components/i18n/lang-switcher';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAdminNavGroups } from '@/hooks/use-admin-nav-groups';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AdminSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
    const navGroups = useAdminNavGroups();

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex flex-1 items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>

                <div className="flex items-center gap-2">
                    <CommandPaletteTrigger onClick={() => setCommandPaletteOpen(true)} />
                    <LangSwitcher variant="icon" />
                    <ThemeToggleAuth />
                </div>
            </div>

            <CommandPalette
                context="admin"
                groups={navGroups}
                open={commandPaletteOpen}
                onOpenChange={setCommandPaletteOpen}
            />
        </header>
    );
}
