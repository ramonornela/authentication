import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  Adapter,
  Authentication,
  HttpAdapter,
  HttpAdapterOptionsToken,
  LocalStorage,
  NonPersistent,
  Storage
} from './providers';

@NgModule({
  providers: [
    Authentication,
    HttpAdapter,
    LocalStorage,
    NonPersistent,
    { provide: HttpAdapterOptionsToken, useValue: null }
  ]
})
export class AuthenticationModule {
  static initialize(adapter?: any, storage?: any): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        { provide: Adapter, useClass: adapter },
        { provide: Storage, useClass: storage }
      ]
    };
  }
}

@NgModule({
  providers: [
    Authentication,
    HttpAdapter,
    LocalStorage,
    NonPersistent,
    { provide: Adapter, useClass: HttpAdapter },
    { provide: HttpAdapterOptionsToken, useValue: null }
  ]
})
export class AuthenticationHttpModule {
  static initialize(storage?: any): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        { provide: Storage, useClass: storage }
      ]
    };
  }
}
