(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var KeyId = '_authlocalstorage';
    var LocalStorage = (function () {
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
            { type: core_1.Injectable },
        ];
        LocalStorage.ctorParameters = [];
        return LocalStorage;
    }());
    exports.LocalStorage = LocalStorage;
});
//# sourceMappingURL=localstorage.js.map