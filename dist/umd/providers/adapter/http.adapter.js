var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/http', '@ramonornela/configuration', '@ramonornela/url-resolver', './adapter.options', '../result'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var http_1 = require('@angular/http');
    var configuration_1 = require('@ramonornela/configuration');
    var url_resolver_1 = require('@ramonornela/url-resolver');
    var adapter_options_1 = require('./adapter.options');
    var result_1 = require('../result');
    exports.ConfigKeyAuth = 'authentication';
    exports.ConfigKeyAdapter = 'http';
    exports.HttpAdapterOptionsToken = new core_1.OpaqueToken('HTTPADAPTEROPTIONS');
    var HttpAdapter = (function (_super) {
        __extends(HttpAdapter, _super);
        function HttpAdapter(http, resolve, config, options) {
            _super.call(this);
            this.http = http;
            this.resolve = resolve;
            this.params = {};
            this.paramNameIdentity = 'username';
            this.paramNameCredential = 'password';
            this.requestOptions = {
                method: 'POST'
            };
            if (options) {
                this.setOptions(options);
            }
            if (config) {
                options = config.get(exports.ConfigKeyAuth);
                if (options) {
                    options = options[exports.ConfigKeyAdapter] || {};
                    if (options) {
                        this.setOptions(options);
                    }
                }
            }
        }
        HttpAdapter.prototype.setUrl = function (url) {
            this.url = url;
            return this;
        };
        HttpAdapter.prototype.setMethod = function (method) {
            this.requestOptions.method = method;
            return this;
        };
        HttpAdapter.prototype.setParams = function (params) {
            this.params = params;
            return this;
        };
        HttpAdapter.prototype.setHeaders = function (headers) {
            this.requestOptions.headers = headers;
            return this;
        };
        HttpAdapter.prototype.setRequestOptions = function (options) {
            this.requestOptions = options;
            return this;
        };
        HttpAdapter.prototype.setParamNameIdentity = function (name) {
            this.paramNameIdentity = name;
            return this;
        };
        HttpAdapter.prototype.setParamNameCredential = function (name) {
            this.paramNameCredential = name;
            return this;
        };
        HttpAdapter.prototype.setCallbackResolve = function (callback) {
            this.callbackResolve = callback;
            return this;
        };
        HttpAdapter.prototype.setCallbackReject = function (callback) {
            this.callbackReject = callback;
            return this;
        };
        HttpAdapter.prototype.setOptions = function (options) {
            this.setUrl(options.url);
            delete options.url;
            if (options.paramNameIdentity) {
                this.setParamNameIdentity(options.paramNameIdentity);
                delete options.paramNameIdentity;
            }
            if (options.paramNameCredential) {
                this.setParamNameCredential(options.paramNameCredential);
                delete options.paramNameCredential;
            }
            if (options.method) {
                this.setMethod(options.method);
                delete options.method;
            }
            if (options.params) {
                this.setParams(options.params);
                delete options.params;
            }
            if (options.headers) {
                this.setHeaders(options.headers);
                delete options.headers;
            }
            else {
                var headers = this.resolve.getMetadata().getHeaders(this.url);
                if (headers) {
                    this.setHeaders(headers);
                }
            }
            if (options.callbackResolve) {
                this.setCallbackResolve(options.callbackResolve);
                delete options.callbackResolve;
            }
            if (options.callbackReject) {
                this.setCallbackReject(options.callbackReject);
                delete options.callbackReject;
            }
            this.setRequestOptions(options);
            return this;
        };
        HttpAdapter.prototype.authenticate = function () {
            var _this = this;
            var params = this.bindParams();
            var url = this.resolve.url(this.url, params);
            return new Promise(function (resolve, reject) {
                _this.http.request(url, _this.requestOptions).subscribe(function (response) {
                    if (typeof _this.callbackResolve === 'function') {
                        resolve(_this.callbackResolve.apply(_this, [response]));
                        return;
                    }
                    resolve(_this.createResultSuccess(response));
                }, function (err) {
                    if (typeof _this.callbackReject === 'function') {
                        reject(_this.callbackReject.apply(_this, [err]));
                        return;
                    }
                    reject(_this.createResultFailure(err));
                });
            });
        };
        HttpAdapter.prototype.bindParams = function () {
            var params = this.params;
            params[this.paramNameIdentity] = this.getIdentity();
            params[this.paramNameCredential] = this.getCredential();
            return params;
        };
        HttpAdapter.prototype.createResultSuccess = function (response) {
            return new result_1.Result(result_1.ResultCode.SUCCESS, this.getIdentity(), response.json() || response.body());
        };
        HttpAdapter.prototype.createResultFailure = function (err) {
            return new result_1.Result(result_1.ResultCode.FAILURE);
        };
        HttpAdapter.decorators = [
            { type: core_1.Injectable },
        ];
        HttpAdapter.ctorParameters = [
            { type: http_1.Http, },
            { type: url_resolver_1.Resolve, },
            { type: configuration_1.Config, decorators: [{ type: core_1.Optional },] },
            { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.HttpAdapterOptionsToken,] },] },
        ];
        return HttpAdapter;
    }(adapter_options_1.AdapterOptions));
    exports.HttpAdapter = HttpAdapter;
});
//# sourceMappingURL=http.adapter.js.map