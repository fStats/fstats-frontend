export interface ApiMessage {
    code: number;
    message: string;
}

export interface AuthToken {
    token: string;
}

export interface DataValue {
    [value: string]: number;
}

export interface LineMetric {
    counts: number[];
    timestamps: number[];
}

export interface PieMetric {
    fabric_api_version: DataValue;
    location: DataValue;
    minecraft_version: DataValue;
    mod_version: DataValue;
    online_mode: DataValue;
    os: DataValue;
    server_side: DataValue;
}

export interface Project {
    hiding_reason?: string;
    id?: number;
    is_hidden?: boolean;
    name: string;
    owner?: User;
}

export interface User {
    id?: number;
    password: string;
    username: string;
}
