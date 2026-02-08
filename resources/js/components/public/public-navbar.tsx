import ThemeToggle from '@/components/appearance/theme-toggle';
import BrandLogo from '@/components/logo/brand-logo';

export function PublicNavbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-14 items-center justify-between">
                    {/* Logo/Brand */}
                    <BrandLogo />

                    {/* Right side - Theme Toggle */}
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
