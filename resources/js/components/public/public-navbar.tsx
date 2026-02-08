import { usePage } from '@inertiajs/react';
import ThemeToggle from '@/components/appearance/theme-toggle';
import LangSwitcher from '@/components/i18n/lang-switcher';
import BrandLogo from '@/components/logo/brand-logo';
import UserDropdown from '@/components/user/user-dropdown';
import { type SharedData } from '@/types';

export function PublicNavbar() {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = !!auth.user;

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-14 items-center justify-between">
                    {/* Logo/Brand */}
                    <BrandLogo />

                    {/* Right side - Theme Toggle, Lang Switcher and User Dropdown */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <LangSwitcher />
                        <ThemeToggle />
                        {isAuthenticated && <UserDropdown />}
                    </div>
                </div>
            </div>
        </nav>
    );
}
