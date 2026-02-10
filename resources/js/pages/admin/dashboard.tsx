import UserInfoCard from '@/components/user/user-info-card';
import { useLang } from '@/hooks/use-lang';
import AdminLayout from '@/layouts/admin/admin-layout';
import { dashboard } from '@/routes/admin';

export default function AdminDashboard() {
    const { transNavigation } = useLang();
    
    const breadcrumbs = [
        { title: transNavigation('nav.dashboard'), href: dashboard().url },
    ];

    return (
        <AdminLayout headTags={{ title: 'Admin Dashboard' }} breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-3xl font-bold">Tableau de bord administrateur</h1>
                    <p className="text-muted-foreground">
                        Panneau d'administration. Voici les informations de votre compte administrateur.
                    </p>
                </div>
                
                <div className="grid gap-6">
                    <UserInfoCard />
                </div>
            </div>
        </AdminLayout>
    );
}
