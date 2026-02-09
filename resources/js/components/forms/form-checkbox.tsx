import type { ComponentProps } from 'react';
import FormField from '@/components/forms/form-field';
import { Checkbox } from '@/components/ui/checkbox';

interface FormCheckboxProps extends Omit<ComponentProps<typeof Checkbox>, 'id' | 'name'> {
    label?: string;
    name: string;
    id?: string;
    error?: string;
    required?: boolean;
    optional?: boolean;
    helpText?: string;
    description?: React.ReactNode;
}

export default function FormCheckbox({
    label,
    name,
    id,
    error,
    required,
    optional,
    helpText,
    description,
    ...checkboxProps
}: FormCheckboxProps) {
    const fieldId = id || name;
    const finalDescription = description ?? helpText;

    return (
        <FormField
            name={name}
            id={fieldId}
            required={required}
            optional={optional}
            error={error}
            description={finalDescription}
        >
            <div className="flex items-center gap-2">
                <Checkbox id={fieldId} {...checkboxProps} />
                {label && (
                    <label
                        htmlFor={fieldId}
                        className="text-sm text-foreground"
                    >
                        {label.charAt(0).toUpperCase() + label.slice(1)}
                    </label>
                )}
            </div>
        </FormField>
    );
}
