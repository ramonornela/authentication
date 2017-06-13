import { Injectable } from '@angular/core';

export interface WriteData {
  identity: string;
  data?: any;
  dataExtra?: any;
}

@Injectable()
export abstract class Storage {
  abstract isEmpty(): boolean;

  abstract write(data: WriteData): void;

  abstract read(): WriteData;

  abstract clear(): void;
}
