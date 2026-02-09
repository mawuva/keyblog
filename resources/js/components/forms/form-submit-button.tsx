import { type ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface FormSubmitButtonProps extends Omit<ComponentProps<typeof Button>, 'type' | 'disabled'> {
    processing: boolean;
    children: React.ReactNode;
}

export default function FormSubmitButton({
    processing,
    children,
    ...buttonProps
}: FormSubmitButtonProps) {
    return (
        <Button
            type="submit"
            disabled={processing}
            {...buttonProps}
        >
            {processing && <Spinner />}
            {children}
        </Button>
    );
}

