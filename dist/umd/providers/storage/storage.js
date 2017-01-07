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
    var Storage = (function () {
        function Storage() {
        }
        Storage.decorators = [
            { type: core_1.Injectable },
        ];
        Storage.ctorParameters = [];
        return Storage;
    }());
    exports.Storage = Storage;
});
//# sourceMappingURL=storage.js.map