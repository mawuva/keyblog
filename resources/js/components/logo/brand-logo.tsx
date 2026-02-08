import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { home } from '@/routes';
import type { SharedData } from '@/types';

export default function BrandLogo() {
    const { name } = usePage<SharedData>().props;
    const firstLetter = name.charAt(0).toUpperCase();

    return (
        <Link 
            href={home().url}
            className="flex items-center space-x-2"
        >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                    {firstLetter}
                </span>
            </div>
            <span className="font-semibold text-foreground">
                {name}
            </span>
        </Link>
    );
}
