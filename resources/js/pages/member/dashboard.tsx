import UserInfoCard from '@/components/user/user-info-card';
import MemberLayout from '@/layouts/member/member-layout';

export default function MemberDashboard() {
    return (
        <MemberLayout headTags={{ title: 'Member Dashboard' }}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Tableau de bord membre</h1>
                    <p className="text-muted-foreground">
                        Bienvenue sur votre espace personnel. Voici les informations de votre compte.
                    </p>
                </div>
                
                <div className="grid gap-6">
                    <UserInfoCard />
                </div>
            </div>
        </MemberLayout>
    );
}
