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
    is_visible?: boolean;
    owner?: Owner;
}

export interface PieMetric {
    minecraft_version: DataValue;
    online_mode: DataValue;
    mod_version: DataValue;
    os: DataValue;
    location: DataValue;
    fabric_api_version: DataValue;
    server_side: DataValue;
}

export interface LineMetric {
    timestamps: number[];
    counts: number[];
}

export interface DataValue {
    [value: string]: number;
}