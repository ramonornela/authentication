import { Injectable } from '@angular/core';
export var Adapter = (function () {
    function Adapter() {
    }
    Adapter.prototype.setIdentity = function (identity) {
        this.identify = identity;
        return this;
    };
    Adapter.prototype.getIdentity = function () {
        return this.identify;
    };
    Adapter.prototype.setCredential = function (credential) {
        this.credential = credential;
        return this;
    };
    Adapter.prototype.getCredential = function () {
        return this.credential;
    };
    Adapter.decorators = [
        { type: Injectable },
    ];
    Adapter.ctorParameters = [];
    return Adapter;
}());
//# sourceMappingURL=adapter.js.map