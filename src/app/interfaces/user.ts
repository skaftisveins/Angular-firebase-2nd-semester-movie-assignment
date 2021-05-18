export interface Roles {
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    status: string;
    roles: Roles;
}
export class EmailPasswordCredentials {
    email: string;
    password: string;
}
