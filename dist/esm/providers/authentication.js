import { Injectable, Optional } from '@angular/core';
import { Storage, LocalStorage } from './storage';
import { Adapter } from './adapter';
export var Authentication = (function () {
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
            this.setStorage(new LocalStorage());
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
        { type: Injectable },
    ];
    Authentication.ctorParameters = [
        { type: Storage, decorators: [{ type: Optional },] },
        { type: Adapter, decorators: [{ type: Optional },] },
    ];
    return Authentication;
}());
//# sourceMappingURL=authentication.js.map