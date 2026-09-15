export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};


export type UserData = {
    id: string;
    uuid: string;
    keycloakId: string;
    name: string;
    email: string;
    roles: string[];
    groups: string[];
    isAdmin: boolean;
    canAccessAdmin: boolean;
    isActive: boolean;
    lastLoginAt: string | null;
    lastLoginIp: string | null;
    createdAt: string | null;
};

export type Auth = {
    user: User;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
