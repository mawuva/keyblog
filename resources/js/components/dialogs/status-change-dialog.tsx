import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import type { StatusData } from '@/types/crud';

const dotColorMap: Record<string, string> = {
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
    gray: 'bg-gray-400',
    secondary: 'bg-gray-400',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500',
};

interface StatusChangeDialogProps {
    open: boolean;
    onClose: () => void;
    changeStatusUrl: string;
    statusOptions: StatusData[];
    currentStatus?: string;
    title?: string;
    description?: string;
    cancelLabel?: string;
    confirmLabel?: string;
}

export default function StatusChangeDialog({
    open,
    onClose,
    changeStatusUrl,
    statusOptions,
    currentStatus,
    title = 'Changer le statut',
    description = 'Sélectionnez le nouveau statut.',
    cancelLabel = 'Annuler',
    confirmLabel = 'Confirmer',
}: StatusChangeDialogProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleConfirm = () => {
        if (!selected) {
            return;
        }

        setProcessing(true);
        router.patch(
            changeStatusUrl,
            { status: selected },
            {
                preserveScroll: true,
                onFinish: () => {
                    setProcessing(false);
                    setSelected(null);
                    onClose();
                },
            },
        );
    };

    const handleOpenChange = (v: boolean) => {
        if (!v) {
            setSelected(null);
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-1 py-2">
                    {statusOptions.map((option) => {
                        const isCurrent = option.value === currentStatus;
                        const isSelected = option.value === selected;

                        return (
                            <button
                                key={option.value}
                                type="button"
                                disabled={isCurrent || processing}
                                onClick={() => setSelected(option.value)}
                                className={cn(
                                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors text-left',
                                    isSelected
                                        ? 'bg-accent ring-1 ring-ring'
                                        : 'hover:bg-accent/50',
                                    isCurrent && 'opacity-50 cursor-not-allowed',
                                )}
                            >
                                <span
                                    className={cn(
                                        'size-2.5 shrink-0 rounded-full',
                                        dotColorMap[option.color] ?? dotColorMap.gray,
                                    )}
                                />
                                <span className="font-medium">{option.label}</span>
                                {isCurrent && (
                                    <span className="ml-auto text-xs text-muted-foreground">
                                        (actuel)
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={processing}>
                        {cancelLabel}
                    </Button>
                    <Button onClick={handleConfirm} disabled={processing || !selected}>
                        {processing && <Spinner />}
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
