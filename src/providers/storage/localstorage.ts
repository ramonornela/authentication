import { Injectable } from '@angular/core'; 
import { Storage, WriteData } from './storage';

const KeyId = '_authlocalstorage';

@Injectable()
export class LocalStorage implements Storage {

  isEmpty() {
    return localStorage.getItem(KeyId) === null;
  }

  write(data: WriteData): void {
    localStorage.setItem(KeyId, JSON.stringify(data));
  }

  read(): WriteData {
    return JSON.parse(localStorage.getItem(KeyId));
  }

  clear(): void {
    localStorage.setItem(KeyId, null);
  }
}
