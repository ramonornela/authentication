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
    var KeyId = '_authnoopersist';
    var NonPersistent = (function () {
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
            { type: core_1.Injectable },
        ];
        NonPersistent.ctorParameters = [];
        return NonPersistent;
    }());
    exports.NonPersistent = NonPersistent;
});
//# sourceMappingURL=nonpersistent.js.map