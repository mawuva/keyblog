import InputError from '@/components/feedback/input-error';
import { Label } from '@/components/ui/label';
import FilePondInput from './filepond-input';

interface FormFilePondInputProps {
    label?: string;
    name: string;
    id?: string;
    error?: string;
    required?: boolean;
    value?: string[];
    onChange: (ids: string[]) => void;
    multiple?: boolean;
    acceptedFileTypes?: string[];
}

export default function FormFilePondInput({
    label,
    name,
    id,
    error,
    required,
    value = [],
    onChange,
    multiple = false,
    acceptedFileTypes = [],
}: FormFilePondInputProps) {
    const fieldId = id || name;

    // Capitaliser la première lettre du label si fourni
    const capitalizedLabel = label
        ? label.charAt(0).toUpperCase() + label.slice(1)
        : null;

    return (
        <div className="grid gap-2">
            {label && (
                <Label htmlFor={fieldId}>
                    {capitalizedLabel}
                    {required && (
                        <span className="ml-1 text-red-600 dark:text-red-400">
                            *
                        </span>
                    )}
                </Label>
            )}
            <FilePondInput
                value={value}
                onChange={onChange}
                multiple={multiple}
                acceptedFileTypes={acceptedFileTypes}
            />
            <InputError message={error} />
        </div>
    );
}
