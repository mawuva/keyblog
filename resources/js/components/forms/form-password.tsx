import type { Link } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import TextLink from '@/components/common/text-link';
import FormField from '@/components/forms/form-field';
import { Input } from '@/components/ui/input';

interface FormPasswordProps extends Omit<ComponentProps<typeof Input>, 'id' | 'name' | 'type'> {
    label?: string;
    name: string;
    id?: string;
    error?: string;
    showToggle?: boolean;
    optional?: boolean;
    helpText?: string;
    description?: React.ReactNode;
    forgotPasswordLink?: {
        href: ComponentProps<typeof Link>['href'];
        text?: string;
        tabIndex?: number;
    };
}

export default function FormPassword({
    label,
    name,
    id,
    error,
    showToggle = false,
    forgotPasswordLink,
    required,
    optional,
    helpText,
    description,
    ...inputProps
}: FormPasswordProps) {
    const fieldId = id || name;
    const [showPassword, setShowPassword] = useState(false);

    const labelRight = forgotPasswordLink ? (
        <TextLink
            href={forgotPasswordLink.href}
            className={label ? 'text-sm' : 'text-sm'}
            tabIndex={forgotPasswordLink.tabIndex}
        >
            {forgotPasswordLink.text || 'Forgot password?'}
        </TextLink>
    ) : undefined;

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
            labelRight={labelRight}
        >
            <div className="relative">
                <Input
                    id={fieldId}
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    className={showToggle ? 'pr-10' : ''}
                    required={required}
                    {...inputProps}
                />
                {showToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                        tabIndex={-1}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                )}
            </div>
        </FormField>
    );
}
