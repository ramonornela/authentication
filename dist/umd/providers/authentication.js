(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', './storage', './adapter'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var storage_1 = require('./storage');
    var adapter_1 = require('./adapter');
    var Authentication = (function () {
        function Authentication(storage, adapter) {
            this.storage = storage;
            this.adapter = adapter;
        }
        Authentication.prototype.setStorage = function (storage) {
            this.storage = storage;
            return this;
        };
        Authentication.prototype.getStorage = function () {
            if (!this.storage) {
                this.setStorage(new storage_1.LocalStorage());
            }
            return this.storage;
        };
        Authentication.prototype.setAdapter = function (adapter) {
            this.adapter = adapter;
            return this;
        };
        Authentication.prototype.getAdapter = function () {
            return this.adapter;
        };
        Authentication.prototype.authenticate = function (adapter) {
            var _this = this;
            if (!adapter) {
                adapter = this.getAdapter();
            }
            if (!adapter) {
                throw new Error('Adapter is required');
            }
            if (this.has()) {
                this.clear();
            }
            return new Promise(function (resolve, reject) {
                adapter.authenticate().then(function (result) {
                    if (result.isValid()) {
                        _this.getStorage().write({
                            identity: result.getIdentity(),
                            data: result.getData()
                        });
                        resolve(result);
                    }
                    reject(result);
                }).catch(function (err) {
                    reject(err);
                });
            });
        };
        Authentication.prototype.has = function () {
            return !this.getStorage().isEmpty();
        };
        Authentication.prototype.clear = function () {
            this.getStorage().clear();
        };
        Authentication.prototype.getIdentity = function () {
            var storage = this.getStorage();
            if (storage.isEmpty()) {
                return;
            }
            return storage.read().identity;
        };
        Authentication.prototype.getData = function () {
            var storage = this.getStorage();
            if (storage.isEmpty()) {
                return;
            }
            return storage.read().data;
        };
        Authentication.decorators = [
            { type: core_1.Injectable },
        ];
        Authentication.ctorParameters = [
            { type: storage_1.Storage, decorators: [{ type: core_1.Optional },] },
            { type: adapter_1.Adapter, decorators: [{ type: core_1.Optional },] },
        ];
        return Authentication;
    }());
    exports.Authentication = Authentication;
});
//# sourceMappingURL=authentication.js.map