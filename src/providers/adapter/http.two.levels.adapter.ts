import { Inject, Injectable, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Config } from '@mbamobi/configuration';
import { Resolve } from '@mbamobi/url-resolver';
import 'rxjs/add/operator/toPromise';
import { Result, ResultCode } from '../result';
import { HttpAdapter, HttpAdapterOptions, HttpAdapterOptionsToken } from './http.adapter';

export interface HttpAdapterTwoLevelsOptions extends HttpAdapterOptions {
  method2: string;
  url2: string;
  params2?: Object;
  preRequestCallback?: Function;
}

@Injectable()
export class HttpTwoLevelsAdapter extends HttpAdapter {
  protected method2: string;
  protected url2: string;
  protected headers2: Object;
  protected params2: Object;
  protected requestOptions2: any;
  protected preRequestCallback: Function;

  constructor(
    http: Http,
    @Optional() resolve: Resolve,
    @Optional() config: Config,
    @Optional() @Inject(HttpAdapterOptionsToken) options: any
  ) {
    super(http, resolve, config, options);
  }

  setUrl2(url: string): this {
    this.url2 = url;
    return this;
  }

  setMethod2(method: string): this {
    this.method2 = method;
    return this;
  }

  setHeaders2(headers: Object): this {
    this.requestOptions2.headers = headers;
    return this;
  }

  setPreRequestCallback(callback: Function): this {
    this.preRequestCallback = callback;
    return this;
  }

  setParams2(params: Object): this {
    this.params2 = params;
    return this;
  }

  setRequestOptions2(options: any): this {
    this.requestOptions2 = options;
    return this;
  }

  setCallbackResolve(): this {
    throw new Error('Not allowed');
  }

  setOptions(options: HttpAdapterTwoLevelsOptions): this {

    this.setUrl2(options.url2);

    this.setOption(options, 'params2')
        .setOption(options, 'method2', true, 'method', this.url2)
        .setOption(options, 'headers2', true, 'headers', this.url2)
        .setOption(options, 'preRequestCallback');

    this.setRequestOptions2(Object.assign({}, this.requestOptions2, options));

    super.setOptions(options);
    return this;
  }

  protected createResultSuccess(response: Response): Promise<Result> {
    if (this.preRequestCallback) {
      this.preRequestCallback.apply(this, [ response ]);
    }

    const url = this.buildUrl(this.params2, this.url2);

    let options: any = this.requestOptions2;
    const callbackBuildParams = this.callbackBuildParams || this.buildParams;

    if (this.params2) {
      const buildParams = callbackBuildParams.apply(this, [ this.params2 ]);
      if (options.method.toUpperCase() === 'POST') {
        options.body = buildParams;
      } else if (options.method.toUpperCase() === 'GET') {
        options.search = buildParams;
      }
    }

    return new Promise((resolve, reject) => {
      this.http.request(url, options).subscribe((response2: Response) => {
        resolve(new Result(ResultCode.SUCCESS, this.getIdentity(), response2.json(), response.json()));
      }, (err) => {
        reject(this.createFailure(err));
      });
    });
  }

  protected createFailure(err: Response) {
    return new Result(ResultCode.FAILURE, this.getIdentity(), err.json());
  }
}
