import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface TrashedFilterProps {
    value: string;
    onChange: (value: string) => void;
    allLabel?: string;
    withTrashedLabel?: string;
    onlyTrashedLabel?: string;
}

export default function TrashedFilter({
    value,
    onChange,
    allLabel = 'Sans corbeille',
    withTrashedLabel = 'Avec corbeille',
    onlyTrashedLabel = 'Corbeille uniquement',
}: TrashedFilterProps) {
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
                <SelectItem value="with">{withTrashedLabel}</SelectItem>
                <SelectItem value="only">{onlyTrashedLabel}</SelectItem>
            </SelectContent>
        </Select>
    );
}
