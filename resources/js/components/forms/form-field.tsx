import type { PropsWithChildren, ReactNode } from 'react';
import InputError from '@/components/feedback/input-error';
import FormLabelWithHelp from '@/components/forms/form-label-with-help';
import { Label } from '@/components/ui/label';

interface FormFieldProps extends PropsWithChildren {
    name: string;
    id?: string;
    label?: string;
    required?: boolean;
    optional?: boolean;
    helpText?: string;
    labelRight?: ReactNode;
    error?: string;
    description?: ReactNode;
}

export default function FormField({
    name,
    id,
    label,
    required = false,
    optional = false,
    helpText,
    labelRight,
    error,
    description,
    children,
}: FormFieldProps) {
    const fieldId = id || name;
    const capitalizedLabel = label ? label.charAt(0).toUpperCase() + label.slice(1) : null;

    return (
        <div className="grid gap-2">
            {(label || labelRight) && (
                <div className="flex items-center gap-2">
                    {label && (
                        helpText ? (
                            <FormLabelWithHelp
                                htmlFor={fieldId}
                                required={required}
                                optional={optional}
                                helpText={helpText}
                            >
                                {capitalizedLabel}
                            </FormLabelWithHelp>
                        ) : (
                            <Label htmlFor={fieldId}>
                                {capitalizedLabel}
                                {required && <span className="text-red-600 dark:text-red-400 ml-1">*</span>}
                                {optional && <span className="ml-2 text-xs text-muted-foreground">(optionnel)</span>}
                            </Label>
                        )
                    )}

                    {labelRight && (
                        <div className={label ? 'ml-auto' : undefined}>
                            {labelRight}
                        </div>
                    )}
                </div>
            )}

            {children}

            {description && (
                <div className="text-xs text-muted-foreground">
                    {description}
                </div>
            )}

            <InputError message={error} />
        </div>
    );
}
