import { Inject, Injectable, OpaqueToken, Optional } from '@angular/core';
import { Storage, WriteData } from './storage';

export const LocalStorageId = '_authlocalstorage';

export const LocalStorageIdToken = new OpaqueToken('LOCALSTORAGEIDTOKEN');

@Injectable()
export class LocalStorage implements Storage {

  constructor(@Optional() @Inject(LocalStorageIdToken) private id?: string) {
    if (!this.id) {
      this.id = LocalStorageId;
    }
  }

  isEmpty() {
    return localStorage.getItem(this.id) === null || localStorage.getItem(this.id) === 'null';
  }

  write(data: WriteData): void {
    localStorage.setItem(this.id, JSON.stringify(data));
  }

  read(): WriteData {
    return JSON.parse(localStorage.getItem(this.id));
  }

  clear(): void {
    localStorage.removeItem(this.id);
  }
}
