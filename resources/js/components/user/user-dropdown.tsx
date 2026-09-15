import { usePage, router } from '@inertiajs/react';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import { useLang } from '@/hooks/use-lang';
import { getUserDropdownItems } from '@/lib/navigation';
import { type SharedData } from '@/types';
import { type DropdownItem } from '@/types/navigation';

export default function UserDropdown() {
    const { auth } = usePage<SharedData>().props;
    const { __ } = useLang();
    const getInitials = useInitials();
    const user = auth.user;

    if (!user) {
        return null;
    }

    const initials = getInitials(user.name);

    const handleLogout = () => {
        router.post('/logout');
    };

    const handleDashboard = () => {
        // Rediriger vers le dashboard approprié selon le rôle de l'utilisateur
        if (user.canAccessAdmin) {
            router.visit('/admin/dashboard');
        } else {
            router.visit('/member/dashboard');
        }
    };

    // Configuration des items du dropdown via la fonction utilitaire
    const dropdownItems: DropdownItem[] = getUserDropdownItems(
        handleDashboard,
        handleLogout,
        __
    );

    // Mapping des icônes pour les items
    const iconMap = {
        dashboard: LayoutDashboard,
        logout: LogOut,
    } as const;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                    aria-label="Menu utilisateur"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56"
                align="end"
                forceMount
            >
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </div>
                
                {/* Itération sur les items du dropdown */}
                {dropdownItems.map((item) => {
                    if (item.separator) {
                        return <DropdownMenuSeparator key={item.key} />;
                    }
                    
                    const Icon = item.icon || iconMap[item.key as keyof typeof iconMap];
                    return (
                        <DropdownMenuItem
                            key={item.key}
                            onClick={item.action}
                            className="cursor-pointer"
                        >
                            {Icon && <Icon className="mr-2 h-4 w-4" />}
                            <span>{item.title}</span>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
