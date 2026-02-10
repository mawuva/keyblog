import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useEffect } from 'react';
import FormInput from '@/components/forms/form-input';
import FormTextarea from '@/components/forms/form-textarea';
import FormDialog from '@/components/forms/layouts/form-dialog';
import { useLang } from '@/hooks/use-lang';
import { store, update } from '@/routes/admin/category';
import type { Category } from '@/types';

interface CategoryFormDialogProps {
    open: boolean;
    onClose: () => void;
    item?: Category | null;
}

export default function CategoryFormDialog({ open, onClose, item }: CategoryFormDialogProps) {
    const { transFrom, transAttr, transAct } = useLang();
    const t = (key: string) => transFrom('pages/admin/catalogs', `category.${key}`);
    const isEditing = !!item;

    const form = useForm({
        name: '',
        description: '',
        order: 0,
        icon_type: '',
        icon_value: '',
    });

    useEffect(() => {
        if (open) {
            form.setData({
                name: item?.name ?? '',
                description: item?.description ?? '',
                order: item?.order ?? 0,
                icon_type: item?.icon_type ?? '',
                icon_value: item?.icon_value ?? '',
            });
            form.clearErrors();
        }
    }, [open, item]);

    const submit = (e: FormEvent) => {
        e.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => onClose(),
        };

        if (isEditing) {
            form.put(update.url(item.id), options);
        } else {
            form.post(store().url, options);
        }
    };

    return (
        <FormDialog
            open={open}
            onClose={onClose}
            title={isEditing ? t('edit.title') : t('create.title')}
            description={isEditing ? t('edit.description') : t('create.description')}
            processing={form.processing}
            onSubmit={submit}
            submitLabel={isEditing ? t('edit.submit') : t('create.submit')}
            cancelLabel={transAct('cancel')}
        >
            <FormInput
                label={transAttr('name')}
                name="name"
                required
                value={form.data.name}
                onChange={(e) => form.setData('name', e.target.value)}
                error={form.errors.name}
            />

            <FormTextarea
                label={transAttr('description')}
                name="description"
                value={form.data.description}
                onChange={(e) => form.setData('description', e.target.value)}
                error={form.errors.description}
                optional
                maxLength={150}
            />

            <FormInput
                label={transAttr('order')}
                name="order"
                type="number"
                value={String(form.data.order)}
                onChange={(e) => form.setData('order', Number(e.target.value))}
                error={form.errors.order}
            />

            <FormInput
                label={transAttr('icon_type')}
                name="icon_type"
                value={form.data.icon_type}
                onChange={(e) => form.setData('icon_type', e.target.value)}
                error={form.errors.icon_type}
                optional
            />

            <FormInput
                label={transAttr('icon_value')}
                name="icon_value"
                value={form.data.icon_value}
                onChange={(e) => form.setData('icon_value', e.target.value)}
                error={form.errors.icon_value}
                optional
            />
        </FormDialog>
    );
}
