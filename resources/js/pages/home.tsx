import { Head } from '@inertiajs/react';
import { useLang } from '@/hooks/use-lang';

export default function Home() {
    const { __, trans } = useLang()

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <h1>Home</h1>

                { __('messages.greeting') } <br />
                { trans('messages.welcome', { name: 'John' }) }
            </div>
        </>
    );
}
