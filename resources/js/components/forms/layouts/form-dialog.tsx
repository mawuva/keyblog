import type { ReactNode } from 'react';
import FormSubmitButton from '@/components/forms/form-submit-button';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface FormDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel: string;
    cancelLabel?: string;
    children: ReactNode;
}

export default function FormDialog({
    open,
    onClose,
    title,
    description,
    processing,
    onSubmit,
    submitLabel,
    cancelLabel = 'Annuler',
    children,
}: FormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    {children}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={processing}>
                            {cancelLabel}
                        </Button>
                        <FormSubmitButton processing={processing}>
                            {submitLabel}
                        </FormSubmitButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
