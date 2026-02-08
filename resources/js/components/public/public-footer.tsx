import { usePage } from '@inertiajs/react';
import BrandLogo from '@/components/logo/brand-logo';
import { useLang } from '@/hooks/use-lang';
import type { SharedData } from '@/types';

export default function PublicFooter() {
    const { name } = usePage<SharedData>().props;
    const { trans } = useLang();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-10">
                <div className="grid gap-8 md:grid-cols-12">
                    <div className="md:col-span-4">
                        <BrandLogo />
                        <div className="mt-3 text-sm text-muted-foreground">
                            Une plateforme simple et moderne.
                        </div>
                    </div>

                    <div className="md:col-span-8">
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                            <div className="space-y-3">
                                <div className="text-sm font-semibold text-foreground">Produit</div>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div>Fonctionnalités</div>
                                    <div>Tarifs</div>
                                    <div>FAQ</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="text-sm font-semibold text-foreground">Entreprise</div>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div>À propos</div>
                                    <div>Contact</div>
                                    <div>Carrières</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="text-sm font-semibold text-foreground">Légal</div>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div>Conditions</div>
                                    <div>Confidentialité</div>
                                    <div>Cookies</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t bg-secondary text-secondary-foreground">
                <div className="container mx-auto px-4 py-4">
                    <div className="text-center text-xs text-secondary-foreground/80">
                        {trans('common.copyright', { year: currentYear, app: name })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
