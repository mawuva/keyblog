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

interface RestoreDialogProps {
    open: boolean;
    onClose: () => void;
    restoreUrl: string;
    title?: string;
    description?: string;
    cancelLabel?: string;
    confirmLabel?: string;
}

export default function RestoreDialog({
    open,
    onClose,
    restoreUrl,
    title = 'Confirmer la restauration',
    description = 'Voulez-vous vraiment restaurer cet élément ?',
    cancelLabel = 'Annuler',
    confirmLabel = 'Restaurer',
}: RestoreDialogProps) {
    const [processing, setProcessing] = useState(false);

    const handleRestore = () => {
        setProcessing(true);
        router.post(restoreUrl, {}, {
            preserveScroll: true,
            onFinish: () => {
                setProcessing(false);
                onClose();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={processing}>
                        {cancelLabel}
                    </Button>
                    <Button onClick={handleRestore} disabled={processing}>
                        {processing && <Spinner />}
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
