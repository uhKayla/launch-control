export interface ServerConfig {
    serverName: string;
    mapName: string;
    serverDescription: string;
    memberLimit: number;
    listenEndPoint: {
        ip: string;
        port: number;
    };
}

export interface HeartbeatStatus {
    simSpeed: number;
    memberCount: number;
    uptime: string;
    status: number;
}

export interface Messages {
    authorName: string;
    author: number;
    channel: number;
    message: string;
}

export interface ChatMessage {
    id: number;
    host: boolean;
    name: string;
    timestamp: Date;
    message: string;
    color: string;
}