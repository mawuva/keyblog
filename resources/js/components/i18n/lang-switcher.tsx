import { usePage } from '@inertiajs/react';
import { Globe, Languages } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];

// Flag mapping for Laravel locales
const flagMap: Record<string, string> = {
    'en': '🇬🇧',
    'fr': '🇫🇷',
    'es': '🇪🇸',
    'de': '🇩🇪',
    'it': '🇮🇹',
    'pt': '🇵🇹',
    'nl': '🇳🇱',
    'ja': '🇯🇵',
    'zh': '🇨🇳',
    'ko': '🇰🇷',
    'ar': '🇸🇦',
    'hi': '🇮🇳',
};

interface LangSwitcherProps {
    className?: string;
    variant?: 'icon' | 'full';
}

export default function LangSwitcher({ className = '', variant = 'icon' }: LangSwitcherProps) {
    const { props } = usePage();
    const locales = props.locales as Record<string, { native?: string; name?: string }> || {};
    const currentLocale = props.currentLocale as string || 'fr';
    
    const [currentLang, setCurrentLang] = useState(currentLocale);

    const handleLanguageChange = (langCode: string) => {
        if (langCode === currentLang) return;
        
        setCurrentLang(langCode);
        
        // Redirect to the locale switch route
        setTimeout(() => {
            window.location.href = `/locale/${langCode}?intended=${encodeURIComponent(window.location.pathname)}`;
        }, 0);
    };

    const getCurrentLanguage = () => {
        // Use Laravel localization data if available
        if (locales[currentLang]) {
            return {
                code: currentLang,
                name: locales[currentLang].native || locales[currentLang].name,
                flag: flagMap[currentLang] || '🌐'
            };
        }
        return languages.find(lang => lang.code === currentLang) || languages[1]; // Default to French
    };

    const currentLanguage = getCurrentLanguage();

    // Convert Laravel locales to dropdown format
    const dropdownLanguages = Object.entries(locales).map(([code, localeData]: [string, { native?: string; name?: string }]) => ({
        code,
        name: localeData.native || localeData.name,
        flag: flagMap[code] || '🌐'
    }));

    if (variant === 'icon') {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-9 w-9 ${className}`}
                        aria-label="Change language"
                    >
                        <Globe className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {dropdownLanguages.map((language) => (
                        <DropdownMenuItem
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            className={`cursor-pointer ${
                                currentLang === language.code ? 'bg-accent' : ''
                            }`}
                        >
                            <span className="mr-2">{language.flag}</span>
                            {language.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    // Full variant with labels
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={`justify-start ${className}`}
                    aria-label="Change language"
                >
                    <Languages className="mr-2 h-4 w-4" />
                    <span className="mr-2">{currentLanguage.flag}</span>
                    {currentLanguage.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                {dropdownLanguages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`cursor-pointer ${
                            currentLang === language.code ? 'bg-accent' : ''
                        }`}
                    >
                        <span className="mr-2">{language.flag}</span>
                        {language.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
