import { Link } from '@inertiajs/react';
import BrandLogo from '@/components/logo/brand-logo';
import { home } from '@/routes';
import { login } from '@/routes/auth';
import { useLang } from '@/hooks/use-lang';

export default function AdminLogin() {
    const { transFrom } = useLang();
    const t = (key: string) => transFrom('pages/auth', key);

    return (
        <div className="min-h-screen bg-secondary/30">
            <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="flex items-center justify-between">
                        <BrandLogo />
                        <Link
                            href={home().url}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {t('back_to_site')}
                        </Link>
                    </div>

                    <div className="mt-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                        <div className="p-6 sm:p-8">
                            <div className="space-y-2">
                                <h1 className="text-xl font-semibold">{t('title')}</h1>
                                <p className="text-sm text-muted-foreground">
                                    {t('subtitle')}
                                </p>
                            </div>

                            <div className="mt-6">
                                <a
                                    href={login().url}
                                    className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    {t('login_button')}
                                </a>
                            </div>

                            <div className="mt-4 text-center text-xs text-muted-foreground">
                                {t('access_restricted')}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-xs text-muted-foreground">
                        {t('support_message')}
                    </div>
                </div>
            </div>
        </div>
    );
}
