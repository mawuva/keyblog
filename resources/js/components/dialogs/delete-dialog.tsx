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

interface DeleteDialogProps {
    open: boolean;
    onClose: () => void;
    deleteUrl: string;
    title?: string;
    description?: string;
    cancelLabel?: string;
    confirmLabel?: string;
}

export default function DeleteDialog({
    open,
    onClose,
    deleteUrl,
    title = 'Confirmer la suppression',
    description = 'Cette action est irréversible. Voulez-vous vraiment supprimer cet élément ?',
    cancelLabel = 'Annuler',
    confirmLabel = 'Supprimer',
}: DeleteDialogProps) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = () => {
        setProcessing(true);
        router.delete(deleteUrl, {
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
                    <Button variant="destructive" onClick={handleDelete} disabled={processing}>
                        {processing && <Spinner />}
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
