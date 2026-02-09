import { HelpCircleIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface FormLabelWithHelpProps {
    htmlFor: string;
    required?: boolean;
    optional?: boolean;
    helpText?: string;
    children: React.ReactNode;
}

export default function FormLabelWithHelp({
    htmlFor,
    required = false,
    optional = false,
    helpText,
    children,
}: FormLabelWithHelpProps) {
    return (
        <Label htmlFor={htmlFor} className="flex items-center gap-2">
            <span>{children}</span>
            {required && <span className="text-red-600 dark:text-red-400">*</span>}
            {optional && <span className="text-xs text-muted-foreground">(optionnel)</span>}
            {helpText && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus:outline-none"
                            onClick={(e) => e.preventDefault()}
                        >
                            <HelpCircleIcon className="size-4" />
                            <span className="sr-only">Aide</span>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="max-w-xs">{helpText}</p>
                    </TooltipContent>
                </Tooltip>
            )}
        </Label>
    );
}
