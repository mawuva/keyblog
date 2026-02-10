import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import FormInput from '@/components/forms/form-input';
import FormSubmitButton from '@/components/forms/form-submit-button';
import FormTextarea from '@/components/forms/form-textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLang } from '@/hooks/use-lang';
import AdminLayout from '@/layouts/admin/admin-layout';
import { edit, index, update } from '@/routes/admin/category';
import type { BreadcrumbItem, Category } from '@/types';

interface Props {
    item: Category;
}

export default function CategoryEdit({ item }: Props) {
    const { transFrom, transAttr } = useLang();
    const t = (key: string) => transFrom('pages/admin/catalogs', `category.${key}`);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('title'), href: index().url },
        { title: item.name, href: edit.url(item.id) },
    ];

    const form = useForm({
        name: item.name,
        description: item.description ?? '',
        order: item.order,
        icon_type: item.icon_type ?? '',
        icon_value: item.icon_value ?? '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.put(update.url(item.id));
    };

    return (
        <AdminLayout headTags={{ title: `${t('edit.title')} — ${item.name}` }} breadcrumbs={breadcrumbs}>
            <div className="mx-auto w-full max-w-2xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('edit.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
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

                            <div className="flex justify-end pt-4">
                                <FormSubmitButton processing={form.processing}>
                                    {t('edit.submit')}
                                </FormSubmitButton>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
