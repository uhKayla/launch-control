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