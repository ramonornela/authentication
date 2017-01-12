import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  Adapter,
  Authentication,
  HttpAdapter,
  HttpAdapterOptionsToken,
  Storage
} from './providers';

@NgModule({
  providers: [
    { provide: HttpAdapterOptionsToken, useValue: null },
    HttpAdapter,
    Authentication
  ]
})
export class AuthenticationModule {
  static initialize(adapter?: any, storage?: any): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        { provide: Adapter, useExisting: adapter },
        { provide: Storage, useExisting: storage }
      ]
    };
  }
}

@NgModule({
  providers: [
    { provide: HttpAdapterOptionsToken, useValue: null },
    HttpAdapter,
    { provide: Adapter, useClass: HttpAdapter },
    Authentication
  ]
})
export class AuthenticationHttpModule {
  static initialize(storage?: any): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        { provide: Storage, useExisting: storage }
      ]
    };
  }
}
