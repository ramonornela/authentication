import { OpaqueToken } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '@ramonornela/configuration';
import { Resolve } from '@ramonornela/url-resolver';
import { AdapterOptions } from './adapter.options';
import { Result } from '../result';
export declare const ConfigKeyAuth: string;
export declare const ConfigKeyAdapter: string;
export declare const HttpAdapterOptionsToken: OpaqueToken;
export interface HttpAdapterOptions {
    [propName: string]: any;
    url: string;
    paramNameIdentity?: string;
    paramNameCredential?: string;
    method?: string;
    params?: Object;
    headers?: any;
    callbackResolve?: Function;
    callbackReject?: Function;
}
export declare class HttpAdapter extends AdapterOptions {
    protected http: Http;
    protected resolve: Resolve;
    protected url: string;
    protected params: Object;
    protected paramNameIdentity: string;
    protected paramNameCredential: string;
    protected callbackResolve: Function;
    protected callbackReject: Function;
    protected requestOptions: any;
    constructor(http: Http, resolve: Resolve, config: Config, options: any);
    setUrl(url: string): this;
    setMethod(method: string): this;
    setParams(params: Object): this;
    setHeaders(headers: Object): this;
    setRequestOptions(options: any): this;
    setParamNameIdentity(name: string): this;
    setParamNameCredential(name: string): this;
    setCallbackResolve(callback: Function): this;
    setCallbackReject(callback: Function): this;
    setOptions(options: HttpAdapterOptions): this;
    authenticate(): Promise<Result>;
    protected bindParams(): Object;
    protected createResultSuccess(response: any): Result;
    protected createResultFailure(err: any): Result;
}
