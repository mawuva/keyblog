import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import FormInput from '@/components/forms/form-input';
import FormSubmitButton from '@/components/forms/form-submit-button';
import FormTextarea from '@/components/forms/form-textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLang } from '@/hooks/use-lang';
import AdminLayout from '@/layouts/admin/admin-layout';
import { create, index, store } from '@/routes/admin/category';
import type { BreadcrumbItem } from '@/types';

export default function CategoryCreate() {
    const { transFrom, transAttr } = useLang();
    const t = (key: string) => transFrom('pages/admin/catalogs', `category.${key}`);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('title'), href: index().url },
        { title: t('create.breadcrumb'), href: create().url },
    ];

    const form = useForm({
        name: '',
        description: '',
        order: 0,
        icon_type: '',
        icon_value: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.post(store().url);
    };

    return (
        <AdminLayout headTags={{ title: t('create.title') }} breadcrumbs={breadcrumbs}>
            <div className="mx-auto w-full max-w-2xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('create.title')}</CardTitle>
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
                                    {t('create.submit')}
                                </FormSubmitButton>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
