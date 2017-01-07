import { Storage } from './storage';
import { Adapter } from './adapter';
import { Result } from './result';
export declare class Authentication {
    private storage;
    private adapter;
    constructor(storage: Storage, adapter: Adapter);
    setStorage(storage: Storage): this;
    getStorage(): Storage;
    setAdapter(adapter: Adapter): this;
    getAdapter(): Adapter;
    authenticate(adapter?: Adapter): Promise<Result>;
    has(): boolean;
    clear(): void;
    getIdentity(): string;
    getData(): any;
}
