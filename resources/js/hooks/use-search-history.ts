import { useCallback, useState } from 'react';

export type SearchContext = 'admin' | 'site';

const STORAGE_KEY_PREFIX = 'search_history';
const MAX_HISTORY_ITEMS = 10;

function getStorageKey(context: SearchContext): string {
    return `${STORAGE_KEY_PREFIX}_${context}`;
}

function loadHistory(context: SearchContext): string[] {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const raw = localStorage.getItem(getStorageKey(context));
        if (!raw) {
            return [];
        }
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveHistory(context: SearchContext, history: string[]): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        localStorage.setItem(getStorageKey(context), JSON.stringify(history));
    } catch {
        // Silently fail if localStorage is full or unavailable
    }
}

export function useSearchHistory(context: SearchContext) {
    const [history, setHistory] = useState<string[]>(() => loadHistory(context));

    const addEntry = useCallback(
        (query: string) => {
            const trimmed = query.trim();
            if (!trimmed) {
                return;
            }

            setHistory((prev) => {
                const filtered = prev.filter((item) => item !== trimmed);
                const updated = [trimmed, ...filtered].slice(0, MAX_HISTORY_ITEMS);
                saveHistory(context, updated);
                return updated;
            });
        },
        [context],
    );

    const removeEntry = useCallback(
        (query: string) => {
            setHistory((prev) => {
                const updated = prev.filter((item) => item !== query);
                saveHistory(context, updated);
                return updated;
            });
        },
        [context],
    );

    const clearHistory = useCallback(() => {
        setHistory([]);
        saveHistory(context, []);
    }, [context]);

    return { history, addEntry, removeEntry, clearHistory };
}
