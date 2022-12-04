export interface Metric {
    timestampSeconds: number
    projectId: number
    isServer: boolean
    minecraftVersion: string
    isOnlineMode: boolean
    modVersion: string
    os: string & { length: 1 }
    location: string
}