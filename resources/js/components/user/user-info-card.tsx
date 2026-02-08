import { usePage } from '@inertiajs/react';
import { Calendar, Clock, Mail, Shield, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type SharedData } from '@/types';

export default function UserInfoCard() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    if (!user) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Informations utilisateur
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Aucun utilisateur connecté</p>
                </CardContent>
            </Card>
        );
    }

    const initials = user.name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informations utilisateur
                </CardTitle>
                <CardDescription>
                    Détails du compte utilisateur connecté
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Avatar et nom */}
                <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {user.email}
                        </p>
                    </div>
                </div>

                {/* Informations détaillées */}
                <div className="grid gap-4">
                    <div className="flex items-center justify-between space-y-0">
                        <span className="text-sm font-medium">ID Utilisateur</span>
                        <Badge variant="secondary">#{user.id}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between space-y-0">
                        <span className="text-sm font-medium flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Date de création
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {new Date(user.created_at).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </span>
                    </div>

                    <div className="flex items-center justify-between space-y-0">
                        <span className="text-sm font-medium flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Dernière mise à jour
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {new Date(user.updated_at).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </span>
                    </div>

                    {user.email_verified_at && (
                        <div className="flex items-center justify-between space-y-0">
                            <span className="text-sm font-medium flex items-center gap-1">
                                <Shield className="h-4 w-4" />
                                Email vérifié
                            </span>
                            <Badge variant="default" className="bg-green-500">
                                Oui
                            </Badge>
                        </div>
                    )}

                    {user.two_factor_enabled !== undefined && (
                        <div className="flex items-center justify-between space-y-0">
                            <span className="text-sm font-medium flex items-center gap-1">
                                <Shield className="h-4 w-4" />
                                Authentification 2FA
                            </span>
                            <Badge variant={user.two_factor_enabled ? "default" : "secondary"}>
                                {user.two_factor_enabled ? "Activée" : "Désactivée"}
                            </Badge>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
