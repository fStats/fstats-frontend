function getEnvVariable(key: string, defaultValue?: string): string {
    const value = import.meta.env[key as keyof ImportMetaEnv];
    if (value === undefined && defaultValue === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value ?? defaultValue!;
}

export const apiUrl = getEnvVariable("VITE_API_URL", "https://api.fstats.dev/v3");
export const isShutdown = getEnvVariable("VITE_SHUTDOWN", "false") === "true";