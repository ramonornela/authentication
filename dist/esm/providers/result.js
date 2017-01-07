export var ResultCode;
(function (ResultCode) {
    ResultCode[ResultCode["FAILURE_UNCATEGORIZED"] = -4] = "FAILURE_UNCATEGORIZED";
    ResultCode[ResultCode["FAILURE_IDENTITY_AMBIGUOUS"] = -3] = "FAILURE_IDENTITY_AMBIGUOUS";
    ResultCode[ResultCode["FAILURE_CREDENTIAL_INVALID"] = -2] = "FAILURE_CREDENTIAL_INVALID";
    ResultCode[ResultCode["FAILURE_IDENTITY_NOT_FOUND"] = -1] = "FAILURE_IDENTITY_NOT_FOUND";
    ResultCode[ResultCode["FAILURE"] = 0] = "FAILURE";
    ResultCode[ResultCode["SUCCESS"] = 1] = "SUCCESS";
})(ResultCode || (ResultCode = {}));
;
export var Result = (function () {
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
//# sourceMappingURL=result.js.map