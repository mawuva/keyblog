import type { ComponentProps } from 'react';
import FormField from '@/components/forms/form-field';
import { Input } from '@/components/ui/input';

interface FormInputProps extends Omit<ComponentProps<typeof Input>, 'id' | 'name'> {
    label?: string;
    name: string;
    id?: string;
    error?: string;
    helpText?: string;
    optional?: boolean;
    description?: React.ReactNode;
}

export default function FormInput({
    label,
    name,
    id,
    error,
    required,
    optional,
    helpText,
    description,
    ...inputProps
}: FormInputProps) {
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
            <Input
                id={fieldId}
                name={name}
                required={required}
                {...inputProps}
            />
        </FormField>
    );
}
