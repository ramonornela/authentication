import { Injectable } from '@angular/core';
var KeyId = '_authlocalstorage';
export var LocalStorage = (function () {
    function LocalStorage() {
    }
    LocalStorage.prototype.isEmpty = function () {
        return localStorage.getItem(KeyId) === null;
    };
    LocalStorage.prototype.write = function (data) {
        localStorage.setItem(KeyId, JSON.stringify(data));
    };
    LocalStorage.prototype.read = function () {
        return JSON.parse(localStorage.getItem(KeyId));
    };
    LocalStorage.prototype.clear = function () {
        localStorage.setItem(KeyId, null);
    };
    LocalStorage.decorators = [
        { type: Injectable },
    ];
    LocalStorage.ctorParameters = [];
    return LocalStorage;
}());
//# sourceMappingURL=localstorage.js.map