import { Link } from '@inertiajs/react';
import { home, login } from '@/routes';

export function PublicTopbar() {
    return (
        <div className="w-full border-b bg-secondary text-secondary-foreground">
            <div className="container mx-auto px-4">
                <div className="flex h-9 items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 truncate">
                        <span className="hidden sm:inline">Support</span>
                        <span className="text-secondary-foreground/80">+241 00 00 00 00</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={home().url}
                            className="text-secondary-foreground/90 hover:text-secondary-foreground transition-colors"
                        >
                            Accueil
                        </Link>
                        <Link
                            href={login().url}
                            className="text-secondary-foreground/90 hover:text-secondary-foreground transition-colors"
                        >
                            Connexion
                        </Link>
                        <a
                            href="/admin/login"
                            className="text-secondary-foreground/90 hover:text-secondary-foreground transition-colors"
                        >
                            Admin
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
