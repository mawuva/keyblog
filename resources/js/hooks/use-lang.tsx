import { usePage } from '@inertiajs/react'

type Replaces = Record<string, string | number>
type LangValue = string | { [key: string]: string | LangValue }
type LangObject = Record<string, LangValue>

export function useLang() {
    const { lang } = usePage<{ lang: LangObject }>().props

    function trans(key: string, replaces: Replaces | string = {}): string {
        const raw = getValueFromKey(key)
        if (typeof raw !== 'string') return key

        let translated = raw

        if (typeof replaces === 'string') {
            translated += ' ' + replaces
        } else if (typeof replaces === 'object') {
            translated = replacePlaceholders(translated, replaces)
        }

        return translated
    }

    function __(key: string, replaces: Replaces | string = {}) {
        return trans(key, replaces)
    }

    function transFrom(namespace: string, key: string, replaces: Replaces | string = {}): string {
        // Si le namespace contient un slash, on concatène avec un point comme avant
        if (namespace.includes('/')) {
            return trans(`${namespace}.${key}`, replaces)
        }
        
        return trans(`${namespace}/${key}`, replaces)
    }

    function replacePlaceholders(text: string, replaces: Replaces): string {
        return Object.entries(replaces).reduce(
            (acc, [key, val]) => {
                const value = String(val)
                // Remplace les deux syntaxes : {name} et :name
                return acc.replaceAll(`{${key}}`, value).replaceAll(`:${key}`, value)
            },
            text
        )
    }

    function getValueFromKey(key: string): string | undefined {
        const segments = key.split('.')
        let current: LangValue | undefined = lang

        for (const segment of segments) {
            if (typeof current !== 'object' || current === null) return undefined
            current = current[segment] as LangValue | undefined
        }

        return typeof current === 'string' ? current : undefined
    }

    /**
     * TransChoice - Gère les traductions avec choix (singulier|pluriel)
     * Si la traduction contient un pipe (|), on peut choisir la partie selon le nombre
     * 
     * @param key - Clé de traduction
     * @param count - Nombre pour déterminer singulier/pluriel (optionnel, par défaut 1 = singulier)
     * @param replaces - Remplacements optionnels
     * @returns La traduction choisie
     */
    function transChoice(key: string, count: number = 1, replaces: Replaces | string = {}): string {
        const raw = getValueFromKey(key)
        if (typeof raw !== 'string') return key

        // Si la chaîne contient un pipe, choisir la partie appropriée
        let translated = raw
        if (raw.includes('|')) {
            const parts = raw.split('|')
            // count === 1 ou count === 0 = singulier (première partie)
            // count > 1 = pluriel (deuxième partie si elle existe)
            translated = count === 1 || count === 0 
                ? parts[0]?.trim() || raw
                : parts[1]?.trim() || parts[0]?.trim() || raw
        }

        // Appliquer les remplacements
        if (typeof replaces === 'string') {
            translated += ' ' + replaces
        } else if (typeof replaces === 'object') {
            translated = replacePlaceholders(translated, replaces)
        }

        return translated
    }

    /**
     * Capitalize the first letter of a string
     */
    function capitalize(text: string): string {
        if (!text) return text;
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    /**
     * Translate and capitalize the first letter
     */
    function __capitalize(key: string, replaces: Replaces | string = {}): string {
        return capitalize(__(key, replaces));
    }

    /**
     * Translate from namespace and capitalize the first letter
     */
    function transFromCapitalize(namespace: string, key: string, replaces: Replaces | string = {}): string {
        return capitalize(transFrom(namespace, key, replaces));
    }

    function transAttr(key: string): string {
        return capitalize(trans(`validation.attributes.${key}`))
    }

    function transMsg(key: string, replaces: Replaces = {}): string {
        return trans(`messages.${key}`, replaces)
    }

    function transCommon(key: string, replaces: Replaces = {}): string {
        return trans(`common.${key}`, replaces)
    }

    function transAct(key: string): string {
        return trans(`actions.${key}`)
    }

    function transNavigation(key: string): string {
        return trans(`navigation.${key}`)
    }

    return { trans, __, transFrom, transChoice, capitalize, __capitalize, transFromCapitalize, transAttr, transMsg, transCommon, transAct, transNavigation }
}
