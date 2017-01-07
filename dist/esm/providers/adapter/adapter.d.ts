import { Result } from '../result';
export declare abstract class Adapter {
    private identify;
    private credential;
    setIdentity(identity: string): this;
    getIdentity(): string;
    setCredential(credential: string): this;
    getCredential(): string;
    abstract authenticate(): Promise<Result>;
}
