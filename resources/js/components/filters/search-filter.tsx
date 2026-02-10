import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFilterProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    debounceMs?: number;
}

export default function SearchFilter({ value, onChange, placeholder = 'Rechercher...', debounceMs = 400 }: SearchFilterProps) {
    const [localValue, setLocalValue] = useState(value);
    const onChangeRef = useRef(onChange);

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (localValue !== value) {
                onChangeRef.current(localValue);
            }
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [localValue, value, debounceMs]);

    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={placeholder}
                className="pl-8 pr-8"
            />
            {localValue && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0.5 top-1/2 size-7 -translate-y-1/2"
                    onClick={() => {
                        setLocalValue('');
                        onChange('');
                    }}
                >
                    <X className="size-3.5" />
                </Button>
            )}
        </div>
    );
}
