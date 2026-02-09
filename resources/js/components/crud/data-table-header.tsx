import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataTableHeaderProps {
    title: string;
    description?: string;
    createRoute?: string;
    createLabel?: string;
}

export default function DataTableHeader({ title, description, createRoute, createLabel = 'Ajouter' }: DataTableHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            {createRoute && (
                <Button asChild>
                    <Link href={createRoute}>
                        <Plus className="size-4" />
                        {createLabel}
                    </Link>
                </Button>
            )}
        </div>
    );
}
