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
    var Adapter = (function () {
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
            { type: core_1.Injectable },
        ];
        Adapter.ctorParameters = [];
        return Adapter;
    }());
    exports.Adapter = Adapter;
});
//# sourceMappingURL=adapter.js.map