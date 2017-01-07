import { NgModule } from '@angular/core';
import { Adapter, Authentication, HttpAdapterOptionsToken, HttpAdapter, Storage } from './providers';
export var AuthenticationModule = (function () {
    function AuthenticationModule() {
    }
    AuthenticationModule.initialize = function (adapter, storage) {
        return {
            ngModule: AuthenticationModule,
            providers: [
                { provide: Adapter, useExisting: adapter },
                { provide: Storage, useExisting: storage }
            ]
        };
    };
    AuthenticationModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        { provide: HttpAdapterOptionsToken, useValue: null },
                        HttpAdapter,
                        Authentication
                    ]
                },] },
    ];
    AuthenticationModule.ctorParameters = [];
    return AuthenticationModule;
}());
export var AuthenticationHttpModule = (function () {
    function AuthenticationHttpModule() {
    }
    AuthenticationHttpModule.initialize = function (storage) {
        return {
            ngModule: AuthenticationModule,
            providers: [
                { provide: Storage, useExisting: storage }
            ]
        };
    };
    AuthenticationHttpModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        { provide: HttpAdapterOptionsToken, useValue: null },
                        HttpAdapter,
                        { provide: Adapter, useClass: HttpAdapter },
                        Authentication
                    ]
                },] },
    ];
    AuthenticationHttpModule.ctorParameters = [];
    return AuthenticationHttpModule;
}());
//# sourceMappingURL=module.js.map