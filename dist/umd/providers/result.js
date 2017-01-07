(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    (function (ResultCode) {
        ResultCode[ResultCode["FAILURE_UNCATEGORIZED"] = -4] = "FAILURE_UNCATEGORIZED";
        ResultCode[ResultCode["FAILURE_IDENTITY_AMBIGUOUS"] = -3] = "FAILURE_IDENTITY_AMBIGUOUS";
        ResultCode[ResultCode["FAILURE_CREDENTIAL_INVALID"] = -2] = "FAILURE_CREDENTIAL_INVALID";
        ResultCode[ResultCode["FAILURE_IDENTITY_NOT_FOUND"] = -1] = "FAILURE_IDENTITY_NOT_FOUND";
        ResultCode[ResultCode["FAILURE"] = 0] = "FAILURE";
        ResultCode[ResultCode["SUCCESS"] = 1] = "SUCCESS";
    })(exports.ResultCode || (exports.ResultCode = {}));
    var ResultCode = exports.ResultCode;
    ;
    var Result = (function () {
        function Result(code, identity, data) {
            this.code = code;
            this.identity = identity;
            this.data = data;
        }
        Result.prototype.isValid = function () {
            return this.code > 0;
        };
        Result.prototype.getData = function () {
            return this.data;
        };
        Result.prototype.getCode = function () {
            return this.code;
        };
        Result.prototype.getIdentity = function () {
            return this.identity;
        };
        return Result;
    }());
    exports.Result = Result;
});
//# sourceMappingURL=result.js.map