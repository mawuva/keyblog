import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { StatusData } from '@/types/crud';

interface StatusFilterProps {
    value: string;
    onChange: (value: string) => void;
    options: StatusData[];
    allLabel?: string;
}

export default function StatusFilter({ value, onChange, options, allLabel = 'Tous les statuts' }: StatusFilterProps) {
    if (options.length === 0) {
        return null;
    }

    return (
        <Select
            value={value || 'all'}
            onValueChange={(v) => onChange(v === 'all' ? '' : v)}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={allLabel} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">{allLabel}</SelectItem>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
