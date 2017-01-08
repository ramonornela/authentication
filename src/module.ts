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
  static initialize(adapter?: Adapter, storage?: Storage): ModuleWithProviders {
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
  static initialize(storage?: Storage): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        { provide: Storage, useExisting: storage }
      ]
    };
  }
}
