import { ModuleWithProviders } from '@angular/core';
import { Adapter, Storage } from './providers';
export declare class AuthenticationModule {
    static initialize(adapter?: Adapter, storage?: Storage): ModuleWithProviders;
}
export declare class AuthenticationHttpModule {
    static initialize(storage?: Storage): ModuleWithProviders;
}
