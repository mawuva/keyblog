import type { ComponentProps } from 'react';
import FormField from '@/components/forms/form-field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export type FormSelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

interface FormSelectProps
    extends Omit<ComponentProps<typeof Select>, 'value' | 'onValueChange' | 'defaultValue'> {
    label?: string;
    name: string;
    id?: string;
    error?: string;
    required?: boolean;
    optional?: boolean;
    helpText?: string;
    description?: React.ReactNode;
    placeholder?: string;
    options: FormSelectOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
};

export default function FormSelect({
    label,
    name,
    id,
    error,
    required,
    optional,
    helpText,
    description,
    placeholder,
    options,
    value,
    defaultValue,
    onValueChange,
    ...selectProps
}: FormSelectProps) {
    const fieldId = id || name;

    return (
        <FormField
            name={name}
            id={fieldId}
            label={label}
            required={required}
            optional={optional}
            helpText={helpText}
            error={error}
            description={description}
        >
            <Select
                value={value}
                defaultValue={defaultValue}
                onValueChange={onValueChange}
                {...selectProps}
            >
                <SelectTrigger id={fieldId}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </FormField>
    );
}
