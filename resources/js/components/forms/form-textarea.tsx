import type { ComponentProps } from 'react';
import FormField from '@/components/forms/form-field';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface FormTextareaProps extends Omit<ComponentProps<typeof Textarea>, 'id' | 'name'> {
    label?: string;
    name: string;
    id?: string;
    error?: string;
    helpText?: string;
    optional?: boolean;
    description?: React.ReactNode;
    maxLength?: number;
}

export default function FormTextarea({
    label,
    name,
    id,
    error,
    required,
    optional,
    helpText,
    description,
    maxLength,
    value,
    ...textareaProps
}: FormTextareaProps) {
    const fieldId = id || name;
    const currentLength = typeof value === 'string' ? value.length : 0;
    const isOverLimit = maxLength ? currentLength > maxLength : false;

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
            labelRight={
                maxLength ? (
                    <span
                        className={cn(
                            'text-xs tabular-nums',
                            isOverLimit ? 'text-destructive' : 'text-muted-foreground',
                        )}
                    >
                        {currentLength}/{maxLength}
                    </span>
                ) : undefined
            }
        >
            <Textarea
                id={fieldId}
                name={name}
                required={required}
                value={value}
                {...textareaProps}
            />
        </FormField>
    );
}
