import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import FormInput from '@/components/forms/form-input';
import FormSubmitButton from '@/components/forms/form-submit-button';
import FormLayout from '@/components/forms/layouts/form-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useLang } from '@/hooks/use-lang';
import AdminLayout from '@/layouts/admin/admin-layout';
import { create, index, store } from '@/routes/admin/role';
import type { BreadcrumbItem, GroupedPermissions } from '@/types';

interface Props {
    permissions: GroupedPermissions;
}

export default function RoleCreate({ permissions }: Props) {
    const { transFrom, transAttr } = useLang();
    const t = (key: string) => transFrom('pages/admin/roles', `role.${key}`);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('title'), href: index().url },
        { title: t('create.breadcrumb'), href: create().url },
    ];

    const form = useForm({
        name: '',
        permissions: [] as number[],
    });

    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        Object.keys(permissions).forEach((group) => {
            initial[group] = true;
        });
        return initial;
    });

    const toggleGroup = (group: string) => {
        setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
    };

    const togglePermission = (permissionId: number) => {
        const current = form.data.permissions;
        if (current.includes(permissionId)) {
            form.setData('permissions', current.filter((id) => id !== permissionId));
        } else {
            form.setData('permissions', [...current, permissionId]);
        }
    };

    const toggleGroupPermissions = (group: string) => {
        const groupPermissionIds = permissions[group].map((p) => p.id);
        const allSelected = groupPermissionIds.every((id) => form.data.permissions.includes(id));

        if (allSelected) {
            form.setData('permissions', form.data.permissions.filter((id) => !groupPermissionIds.includes(id)));
        } else {
            const newPermissions = [...new Set([...form.data.permissions, ...groupPermissionIds])];
            form.setData('permissions', newPermissions);
        }
    };

    const selectAll = () => {
        const allIds = Object.values(permissions).flat().map((p) => p.id);
        form.setData('permissions', allIds);
    };

    const deselectAll = () => {
        form.setData('permissions', []);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.post(store().url);
    };

    return (
        <AdminLayout headTags={{ title: t('create.title') }} breadcrumbs={breadcrumbs}>
            <FormLayout
                title={t('create.title')}
                description={t('description')}
                submitButton={
                    <FormSubmitButton 
                        processing={form.processing} 
                        variant="success" 
                        className="w-full sm:w-auto"
                        form="role-form"
                    >
                        {t('create.submit')}
                    </FormSubmitButton>
                }
            >
                <form id="role-form" onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('fields.name')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormInput
                                label={transAttr('name')}
                                name="name"
                                required
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                error={form.errors.name}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>{t('permissions_section.title')}</CardTitle>
                                    <p className="text-muted-foreground mt-1 text-sm">
                                        {t('permissions_section.description')}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={selectAll}
                                        className="text-primary text-sm font-medium hover:underline"
                                    >
                                        {t('permissions_section.select_all')}
                                    </button>
                                    <span className="text-muted-foreground">|</span>
                                    <button
                                        type="button"
                                        onClick={deselectAll}
                                        className="text-primary text-sm font-medium hover:underline"
                                    >
                                        {t('permissions_section.deselect_all')}
                                    </button>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                {t('permissions_section.selected').replace(':count', String(form.data.permissions.length))}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Object.entries(permissions).map(([group, groupPermissions]) => {
                                    const groupPermissionIds = groupPermissions.map((p) => p.id);
                                    const allSelected = groupPermissionIds.every((id) => form.data.permissions.includes(id));
                                    const someSelected = groupPermissionIds.some((id) => form.data.permissions.includes(id));

                                    return (
                                        <div key={group} className="rounded-lg border">
                                            <div
                                                className="flex cursor-pointer items-center gap-3 px-4 py-3"
                                                onClick={() => toggleGroup(group)}
                                            >
                                                <Checkbox
                                                    checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                                                    onCheckedChange={() => toggleGroupPermissions(group)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <span className="text-sm font-semibold capitalize">{group}</span>
                                                <span className="text-muted-foreground text-xs">
                                                    ({groupPermissions.length})
                                                </span>
                                                <span className="ml-auto text-xs">
                                                    {expandedGroups[group] ? '▼' : '▶'}
                                                </span>
                                            </div>
                                            {expandedGroups[group] && (
                                                <div className="border-t px-4 py-3">
                                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                                                        {groupPermissions.map((permission) => (
                                                            <Label
                                                                key={permission.id}
                                                                className="flex items-center gap-2 text-sm font-normal"
                                                            >
                                                                <Checkbox
                                                                    checked={form.data.permissions.includes(permission.id)}
                                                                    onCheckedChange={() => togglePermission(permission.id)}
                                                                />
                                                                <span className="truncate" title={permission.name}>
                                                                    {permission.name.replace(`${group}.`, '')}
                                                                </span>
                                                            </Label>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            {form.errors.permissions && (
                                <p className="mt-2 text-sm text-red-600">{form.errors.permissions}</p>
                            )}
                        </CardContent>
                    </Card>
                </form>
            </FormLayout>
        </AdminLayout>
    );
}
