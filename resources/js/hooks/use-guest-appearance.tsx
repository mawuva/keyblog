import { useCallback, useEffect, useState } from 'react';

export type GuestAppearance = 'light' | 'dark';

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: GuestAppearance) => {
    const isDark = appearance === 'dark';

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
};

export function initializeGuestTheme() {
    const savedAppearance =
        (localStorage.getItem('guest_appearance') as GuestAppearance) || 'light';

    applyTheme(savedAppearance);
}

export function useGuestAppearance() {
    const [appearance, setAppearance] = useState<GuestAppearance>('light');

    const updateAppearance = useCallback((mode: GuestAppearance) => {
        setAppearance(mode);

        // Store in localStorage for client-side persistence
        localStorage.setItem('guest_appearance', mode);

        // Store in cookie for SSR
        setCookie('guest_appearance', mode);

        applyTheme(mode);
    }, []);

    useEffect(() => {
        const savedAppearance = localStorage.getItem(
            'guest_appearance',
        ) as GuestAppearance | null;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        updateAppearance(savedAppearance || 'light');
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
}

