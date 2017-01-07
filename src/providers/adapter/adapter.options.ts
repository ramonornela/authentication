import { Adapter } from './adapter';

export abstract class AdapterOptions extends Adapter {
  abstract setOptions(options: Object): this;
}
