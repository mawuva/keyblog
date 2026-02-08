import UserInfoCard from '@/components/user/user-info-card';
import AdminLayout from '@/layouts/admin/admin-layout';

export default function AdminDashboard() {
    return (
        <AdminLayout headTags={{ title: 'Admin Dashboard' }}>
            <div className="space-y-6">
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
