import { type DropdownItem } from '@/types/navigation';

export function getUserDropdownItems(
    handleDashboard: () => void,
    handleLogout: () => void,
    translate: (key: string) => string
): DropdownItem[] {
    return [
        {
            key: 'dashboard',
            title: translate('navigation.user_dropdown.dashboard'),
            action: handleDashboard,
        },
        {
            key: 'separator',
            title: '',
            action: () => {},
            separator: true,
        },
        {
            key: 'logout',
            title: translate('navigation.user_dropdown.logout'),
            action: handleLogout,
        },
    ];
}
