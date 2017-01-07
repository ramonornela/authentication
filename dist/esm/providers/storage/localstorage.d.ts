import { Storage, WriteData } from './storage';
export declare class LocalStorage implements Storage {
    isEmpty(): boolean;
    write(data: WriteData): void;
    read(): WriteData;
    clear(): void;
}
