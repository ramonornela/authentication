import { Injectable } from '@angular/core';
var KeyId = '_authnoopersist';
export var NonPersistent = (function () {
    function NonPersistent() {
        this.data = {};
    }
    NonPersistent.prototype.isEmpty = function () {
        return this.data[KeyId] === undefined || this.data[KeyId] === null;
    };
    NonPersistent.prototype.write = function (data) {
        this.data[KeyId] = data;
    };
    NonPersistent.prototype.read = function () {
        return this.data[KeyId];
    };
    NonPersistent.prototype.clear = function () {
        delete this.data[KeyId];
    };
    NonPersistent.decorators = [
        { type: Injectable },
    ];
    NonPersistent.ctorParameters = [];
    return NonPersistent;
}());
//# sourceMappingURL=nonpersistent.js.map