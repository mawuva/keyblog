import PublicLayout from '@/layouts/public/public-layout';
import { useLang } from '@/hooks/use-lang'

export default function About() {
    const { __, trans } = useLang()

    return (
        <PublicLayout
            headTags={{
                title: "About",
                children: (
                    <>
                        <link rel="preconnect" href="https://fonts.bunny.net" />
                        <link
                            href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                            rel="stylesheet"
                        />
                    </>
                ),
            }}
        >
            <div className="flex min-h-0 flex-col items-center p-6 lg:justify-center lg:p-8">
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl">
                        <h1 className="text-2xl font-bold text-foreground mb-4">
                            Bienvenue sur Bon Bizz
                        </h1>
                        <p className="text-muted-foreground mb-8">
                            La solution moderne pour gérer votre entreprise.
                        </p>

                        { __('messages.greeting') } <br />
                        { trans('messages.welcome', { name: 'John' }) }
                    </main>
                </div>
            </div>
        </PublicLayout>
    );
}
