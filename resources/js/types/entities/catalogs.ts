import type { StatusData } from '../crud';

export type Category = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    order: number;
    icon_type: string | null;
    icon_value: string | null;
    status: StatusData | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    created_at_formatted: string;
};
