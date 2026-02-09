import type { ReactNode } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useLang } from '@/hooks/use-lang';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

interface Props {
    title: string;
    description?: string;
    breadcrumbs?: BreadcrumbItemType[];
    children: ReactNode;
    submitButton?: ReactNode;
}

export default function FormLayout({ title, description, breadcrumbs, children, submitButton }: Props) {
    const { __ } = useLang();

    return (
        <div className="flex flex-col h-full min-h-screen">
            <div className="flex-1 space-y-6 p-4">
                {/* Header with title and description */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                    {description && (
                        <p className="text-muted-foreground">{description}</p>
                    )}
                </div>

                {/* Breadcrumbs */}
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((item, index) => (
                                <BreadcrumbItem key={index}>
                                    {index === breadcrumbs.length - 1 ? (
                                        <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                                    )}
                                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                                </BreadcrumbItem>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                )}

                {/* Form content */}
                <div className="space-y-6">
                    {children}
                </div>
            </div>

            {/* Fixed bottom bar with submit button */}
            {submitButton && (
                <div className="fixed left-0 right-0 bottom-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background shadow-lg p-4">
                    <div className="mx-auto w-full max-w-4xl px-4">
                        {submitButton}
                    </div>
                </div>
            )}
        </div>
    );
}
