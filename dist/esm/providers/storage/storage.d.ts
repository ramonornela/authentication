export interface WriteData {
    identity: string;
    data?: any;
}
export declare abstract class Storage {
    abstract isEmpty(): boolean;
    abstract write(data: WriteData): void;
    abstract read(): WriteData;
    abstract clear(): void;
}
