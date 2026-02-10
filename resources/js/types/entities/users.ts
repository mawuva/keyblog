export type AppUser = {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    roles: string[];
    permissions: string[];
    created_at: string;
    updated_at: string;
};
