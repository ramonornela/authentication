(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', './providers'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var providers_1 = require('./providers');
    var AuthenticationModule = (function () {
        function AuthenticationModule() {
        }
        AuthenticationModule.initialize = function (adapter, storage) {
            return {
                ngModule: AuthenticationModule,
                providers: [
                    { provide: providers_1.Adapter, useExisting: adapter },
                    { provide: providers_1.Storage, useExisting: storage }
                ]
            };
        };
        AuthenticationModule.decorators = [
            { type: core_1.NgModule, args: [{
                        providers: [
                            { provide: providers_1.HttpAdapterOptionsToken, useValue: null },
                            providers_1.HttpAdapter,
                            providers_1.Authentication
                        ]
                    },] },
        ];
        AuthenticationModule.ctorParameters = [];
        return AuthenticationModule;
    }());
    exports.AuthenticationModule = AuthenticationModule;
    var AuthenticationHttpModule = (function () {
        function AuthenticationHttpModule() {
        }
        AuthenticationHttpModule.initialize = function (storage) {
            return {
                ngModule: AuthenticationModule,
                providers: [
                    { provide: providers_1.Storage, useExisting: storage }
                ]
            };
        };
        AuthenticationHttpModule.decorators = [
            { type: core_1.NgModule, args: [{
                        providers: [
                            { provide: providers_1.HttpAdapterOptionsToken, useValue: null },
                            providers_1.HttpAdapter,
                            { provide: providers_1.Adapter, useClass: providers_1.HttpAdapter },
                            providers_1.Authentication
                        ]
                    },] },
        ];
        AuthenticationHttpModule.ctorParameters = [];
        return AuthenticationHttpModule;
    }());
    exports.AuthenticationHttpModule = AuthenticationHttpModule;
});
//# sourceMappingURL=module.js.map