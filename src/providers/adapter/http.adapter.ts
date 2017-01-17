import { Inject, Injectable, OpaqueToken, Optional } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Config } from '@mbamobi/configuration';
import { Resolve } from '@mbamobi/url-resolver';
import { Result, ResultCode } from '../result';
import { AdapterOptions } from './adapter.options';

export const ConfigKeyAuth = 'authentication';

export const ConfigKeyAdapter = 'http';

export const HttpAdapterOptionsToken = new OpaqueToken('HTTPADAPTEROPTIONS');

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
  callbackBuildParams?: Function;
}

@Injectable()
export class HttpAdapter extends AdapterOptions {

   protected url: string;

   protected params: Object = {};

   protected paramNameIdentity: string = 'username';

   protected paramNameCredential: string = 'password';

   protected callbackResolve: Function;

   protected callbackReject: Function;

   protected callbackBuildParams: Function;

   protected requestOptions: any = {
     method: 'POST'
   };

   constructor(
     protected http: Http,
     @Optional() protected resolve: Resolve,
     @Optional() config: Config,
     @Optional() @Inject(HttpAdapterOptionsToken) options: any
   ) {
     super();

     if (options) {
       this.setOptions(options);
     }

     if (config) {
       // @todo adjust config to accept key authentication.http
       options = config.get(ConfigKeyAuth);

       if (options) {
         options = options[ConfigKeyAdapter] || {};
         if (options) {
           this.setOptions(options);
         }
       }
     }
   }

   setUrl(url: string): this {
     this.url = url;
     return this;
   }

   setMethod(method: string): this {
     this.requestOptions.method = method;
     return this;
   }

   setParams(params: Object): this {
     this.params = params;
     return this;
   }

   setHeaders(headers: Object): this {
     this.requestOptions.headers = headers;
     return this;
   }

   setRequestOptions(options: any): this {
     this.requestOptions = options;
     return this;
   }

   setParamNameIdentity(name: string): this {
     this.paramNameIdentity = name;
     return this;
   }

   setParamNameCredential(name: string): this {
     this.paramNameCredential = name;
     return this;
   }

   setCallbackResolve(callback: Function): this {
     this.callbackResolve = callback;
     return this;
   }

   setCallbackReject(callback: Function): this {
     this.callbackReject = callback;
     return this;
   }

   setCallbackBuildParams(callback: Function): this {
     this.callbackBuildParams = callback;
     return this;
   }

   protected setOption(options: Object, option: string, resolve: boolean = false) {
     const setMethod = [
       'set',
       option.charAt(0).toUpperCase(),
       option.substr(1)
     ].join('');

     if (options[option]) {
       this[setMethod](options[option]);
       delete options[option];
     } if (resolve && this.resolve) {
       const getMethodResolve = [
         'get',
         option.charAt(0).toUpperCase(),
         option.substr(1)
       ].join('');

       const value = this.resolve.getMetadata()[getMethodResolve](this.url);
       if (value) {
         this[setMethod](value);
       }
     }

     return this;
   }

   setOptions(options: HttpAdapterOptions): this {

     this.setUrl(options.url);
     delete options.url;

     this.setOption(options, 'paramNameIdentity')
         .setOption(options, 'paramNameCredential')
         .setOption(options, 'method', true)
         .setOption(options, 'params')
         .setOption(options, 'headers', true)
         .setOption(options, 'callbackResolve')
         .setOption(options, 'callbackReject')
         .setOption(options, 'callbackBuildParams');

     this.setRequestOptions(Object.assign({}, this.requestOptions, options));

     return this;
   }

   authenticate(): Promise<Result> {
     const params = this.bindParams();
     const url    = this.buildUrl(params);

     let options: any = this.requestOptions;

     const callbackBuildParams = this.callbackBuildParams || this.buildParams;

     if (params) {
       const buildParams = callbackBuildParams.apply(this, [ params ]);
       if (options.method.toUpperCase() === 'POST') {
         options.body = buildParams;
       } else if (options.method.toUpperCase() === 'GET') {
         options.search = buildParams;
       }
     }

     return new Promise((resolve: any, reject: any) => {
       this.http.request(url, options).subscribe((response) => {
         if (typeof this.callbackResolve === 'function') {

           const resultSuccess: any = this.callbackResolve.apply(this, [ response ]);
           this.resultCallback(resultSuccess, resolve, reject);
           return;
         }

         const resultSuccess: any = this.createResultSuccess(response);
         this.resultCallback(resultSuccess, resolve, reject);
       }, (err: any) => {
         if (typeof this.callbackReject === 'function') {
           const resultError: any = this.callbackReject.apply(this, [ err ]);
           this.resultCallback(resultError, null, reject);
           return;
         }

         const resultError: any = this.createResultFailure(err);
         this.resultCallback(resultError, null, reject);
       });
     });
   }

   protected bindParams(): Object {
     let params = this.params;

     params[this.paramNameIdentity] = this.getIdentity();
     params[this.paramNameCredential] = this.getCredential();

     return params;
   }

   protected buildUrl(params: Object, url?: string): string {
     url = url || this.url;

     if (this.resolve && this.resolve.getMetadata().has(url)) {
       url = this.resolve.url(url, params);
     }

     return url;
   }

   protected buildParams(params: any) {
     const searchParams = new URLSearchParams('');

     for (let param in params) {
       searchParams.set(param, params[param]);
     }

     return searchParams;
   }

   protected createResultSuccess(response: any): Promise<Result> | Result {
     return new Result(ResultCode.SUCCESS, this.getIdentity(), response.json() || response.body());
   }

   protected createResultFailure(err: any): Promise<Result> | Result {
     return new Result(ResultCode.FAILURE, null, err);
   }

   protected resultCallback(result: any, resolve: Function, reject: Function) {
     if (result instanceof Result) {
       resolve(result);
       return;
     }

     if (result instanceof Promise) {
       if (resolve) {
         result = result.then((data: Result) => {
          resolve(data);
        });
       }

       if (reject) {
         result.catch((err: Result) => {
          reject(err);
        });
       }

       if (!resolve && !reject) {
         throw new Error('Need info resolve or reject');
       }

       return;
     }

     throw new Error('Return data type error');
   }
}
