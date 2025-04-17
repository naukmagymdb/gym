export interface DbOptions {
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    database?: string;
    retryAttempts?: number;
    delay?: number;
}