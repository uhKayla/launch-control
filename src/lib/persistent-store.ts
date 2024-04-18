import { writable, type Writable } from 'svelte/store';

function createLocalStorageStore<T>(key: string, initialValue: T): Writable<T> {
    const storedValue = localStorage.getItem(key);
    const initial: T = storedValue ? JSON.parse(storedValue) : initialValue;

    const { subscribe, set, update } = writable<T>(initial);

    console.log("data saved")

    return {
        subscribe,
        set: (value: T) => {
            localStorage.setItem(key, JSON.stringify(value));
            set(value);
        },
        update: (func: (value: T) => T) => {
            const newValue = func(initial);
            localStorage.setItem(key, JSON.stringify(newValue));
            update(func);
        }
    };
}

export const serverAddress = createLocalStorageStore<string>('serverAddress', '');
export const securityToken = createLocalStorageStore<string>('securityToken', '');
