import type { ReactNode } from 'react';

export interface HeadTags {
  title?: string;
  description?: string;
  keywords?: string;
  children?: ReactNode;
}

export interface MetaTags {
  name: string;
  content: string;
}

export interface LinkTags {
  rel: string;
  href: string;
  type?: string;
}
