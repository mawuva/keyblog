import { Link, usePage } from '@inertiajs/react';
import { LogIn, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/use-lang';
import { login } from '@/routes';
import admin from '@/routes/admin';
import { type SharedData } from '@/types';

export function PublicAuthBanner() {
    const { auth } = usePage<SharedData>().props;
    const { __ } = useLang();

    if (auth.user) {
        return null;
    }

    return (
        <>
            <div className="h-16 md:hidden" />

            <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 md:hidden">
                <div className="container mx-auto flex items-center gap-2 px-4 py-3">
                    <Button asChild className="flex-1">
                        <Link href={login().url}>
                            <LogIn className="mr-2 h-4 w-4" />
                            {__('navigation.nav.login')}
                        </Link>
                    </Button>

                    <Button asChild variant="outline" className="flex-1">
                        <a href={admin.login.url()}>
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            {__('navigation.breadcrumbs.admin')}
                        </a>
                    </Button>
                </div>
            </div>
        </>
    );
}
