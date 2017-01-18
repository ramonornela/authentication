import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  Adapter,
  Authentication,
  HttpAdapter,
  HttpAdapterOptionsToken,
  LocalStorage,
  LocalStorageIdToken,
  NonPersistent,
  NonPersistentIdToken,
  Storage
} from './providers';

@NgModule()
export class AuthenticationModule {
  static initialize(adapter?: any, storage?: any): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        Authentication,
        HttpAdapter,
        LocalStorage,
        { provide: LocalStorageIdToken, useValue: null },
        NonPersistent,
        { provide: NonPersistentIdToken, useValue: null },
        { provide: HttpAdapterOptionsToken, useValue: null },
        { provide: Adapter, useClass: adapter },
        { provide: Storage, useClass: storage }
      ]
    };
  }
}

@NgModule()
export class AuthenticationHttpModule {
  static initialize(storage?: any): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        Authentication,
        HttpAdapter,
        LocalStorage,
        { provide: LocalStorageIdToken, useValue: null },
        NonPersistent,
        { provide: NonPersistentIdToken, useValue: null },
        { provide: Adapter, useClass: HttpAdapter },
        { provide: HttpAdapterOptionsToken, useValue: null },
        { provide: Storage, useClass: storage },
      ]
    };
  }
}
