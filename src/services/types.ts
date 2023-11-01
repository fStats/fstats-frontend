export interface AuthToken {
    token: string;
}

export interface ApiMessage {
    code: number;
    message: string;
}

export interface User {
    id?: number;
    username: string;
    password: string;
}

export interface Owner {
    id: number;
    username: string;
}

export interface Project {
    id?: number;
    name: string;
    owner?: Owner;
}

export interface ProjectWithMinecraftData {
    project: Project;
    metric_map: MinecraftData;
}

export interface ProjectWithMetric {
    project: Project;
    metrics: Metric[];
}

export interface Metric {
    timestampSeconds: number;
    projectId: number;
    isServer: boolean;
    minecraftVersion: string;
    isOnlineMode: boolean;
    modVersion: string;
    os: string & { length: 1 };
    location: string;
    fabric_api_version: string;
}

export interface MinecraftData {
    minecraft_version: DataValue;
    online_mode: DataValue;
    mod_version: DataValue;
    os: DataValue;
    location: DataValue;
    fabric_api_version: DataValue;
}

export interface DataValue {
    [value: string]: number;
}