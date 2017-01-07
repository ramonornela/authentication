import { Injectable } from '@angular/core'; 
import { Storage, WriteData } from './storage';

const KeyId = '_authnoopersist';

@Injectable()
export class NonPersistent implements Storage {
  
  private data: any = {};

  isEmpty(): boolean {
    return this.data[KeyId] === undefined || this.data[KeyId] === null;
  }

  write(data: WriteData): void {
    this.data[KeyId] = data;
  }

  read(): WriteData {
    return this.data[KeyId];
  }

  clear(): void {
    delete this.data[KeyId];
  }
}
