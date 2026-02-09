import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface DataTableFilterSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

export default function DataTableFilterSelect({ label, value, onChange, options }: DataTableFilterSelectProps) {
    return (
        <Select
            value={value || 'all'}
            onValueChange={(v) => onChange(v === 'all' ? '' : v)}
        >
            <SelectTrigger className="w-[160px]">
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">{label}</SelectItem>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
