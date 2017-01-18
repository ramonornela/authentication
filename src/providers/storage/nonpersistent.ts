import { Inject, Injectable, OpaqueToken, Optional } from '@angular/core';
import { Storage, WriteData } from './storage';

export const NonPersistentId = '_authlocalstorage';

export const NonPersistentIdToken = new OpaqueToken('NONPERSISTIDTOKEN');


@Injectable()
export class NonPersistent implements Storage {

  private data: any = {};

  constructor(@Optional() @Inject(NonPersistentIdToken) private id?: string) {
    if (!this.id) {
      this.id = NonPersistentId;
    }
  }

  isEmpty(): boolean {
    return this.data[this.id] === undefined || this.data[this.id] === null;
  }

  write(data: WriteData): void {
    this.data[this.id] = data;
  }

  read(): WriteData {
    return this.data[this.id];
  }

  clear(): void {
    delete this.data[this.id];
  }
}
