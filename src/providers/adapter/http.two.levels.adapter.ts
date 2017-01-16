import { Inject, Injectable, Optional } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '@mbamobi/configuration';
import { Resolve } from '@mbamobi/url-resolver';
import 'rxjs/add/operator/toPromise';
import { Result, ResultCode } from '../result';
import { HttpAdapter, HttpAdapterOptions, HttpAdapterOptionsToken } from './http.adapter';

export interface HttpAdapterTwoLevelsOptions extends HttpAdapterOptions {
  url2: string;
  params2?: Object;
}

@Injectable()
export class HttpTwoLevelsAdapter extends HttpAdapter {
  protected url2: string;
  protected params2: Object;

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

  setParams2(params: Object): this {
    this.params2 = params;
    return this;
  }

  setCallbackResolve(callback: Function): this {
     throw new Error('Not allowed');
   }

  setOptions(options: HttpAdapterTwoLevelsOptions): this {

    if (options.url2) {
      this.setUrl2(options.url2);
      delete options.url2;
    }

    if (options.params2) {
      this.setParams2(options.params2);
      delete options.params2;
    }

    super.setOptions(options);
    return this;
  }

  protected createResultSuccess(response: any): Promise<Result> {
    const url = this.buildUrl(this.params2, this.url2);

    return new Promise((resolve, reject) => {
      this.http.request(url).subscribe((response) => {
        resolve(new Result(ResultCode.SUCCESS, this.getIdentity(), response.json() || response.body()));
      });
    });
  }
}
