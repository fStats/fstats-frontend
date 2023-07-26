export interface ApiMessage {
    code: number
    message: string
}

export interface AuthToken {
    token: string
}

export interface DataValue {
    [value: string]: number;
}

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

export interface MinecraftData {
    minecraft_version: DataValue;
    online_mode: DataValue;
    mod_version: DataValue;
    os: DataValue;
    location: DataValue;
}

export interface Project {
    id: number
    name: string
    owner: Owner
}

export interface Owner {
    id: number
    username: string
}

export interface User {
    id?: number
    username: string
    password: string
}