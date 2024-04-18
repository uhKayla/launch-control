// src/lib/persistentStore.ts
import { writable, type Writable } from 'svelte/store';
import type { ServerConfig } from './types';

function createLocalStorageStore<T>(key: string, initialValue: T): Writable<T> {
    const storedValue = localStorage.getItem(key);
    const initial: T = storedValue ? JSON.parse(storedValue) : initialValue;

    const { subscribe, set, update } = writable<T>(initial);

    return {
        subscribe,
        set: (value: T) => {
            localStorage.setItem(key, JSON.stringify(value));
            console.log("Data saved:", key);  // Logging the key of saved data for clarity
            set(value);
        },
        update: (func: (currentValue: T) => T) => {
            const newValue = func(initial);
            localStorage.setItem(key, JSON.stringify(newValue));
            update(func);
        }
    };
}

// Definitions for the simple string stores
export const serverAddress = createLocalStorageStore<string>('serverAddress', '');
export const securityToken = createLocalStorageStore<string>('securityToken', '');

// Definition for the complex JSON store
export const serverConfig = createLocalStorageStore<ServerConfig>('serverConfig', {
    serverName: '',
    mapName: '',
    serverDescription: '',
    memberLimit: 0,
    listenEndPoint: {
        ip: '',
        port: 0
    }
});
