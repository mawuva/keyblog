import { Head } from '@inertiajs/react';
import type { HeadTags } from '@/types/head';

export function AppHeadTags({ 
  title, 
  description, 
  keywords, 
  children 
}: HeadTags) {
  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {children}
    </Head>
  );
}
