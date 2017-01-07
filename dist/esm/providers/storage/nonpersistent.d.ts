import { Storage, WriteData } from './storage';
export declare class NonPersistent implements Storage {
    private data;
    isEmpty(): boolean;
    write(data: WriteData): void;
    read(): WriteData;
    clear(): void;
}
