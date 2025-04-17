/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_SHUTDOWN: boolean
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
