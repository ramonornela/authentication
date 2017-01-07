export enum ResultCode {
  FAILURE_UNCATEGORIZED = -4,
  FAILURE_IDENTITY_AMBIGUOUS,
  FAILURE_CREDENTIAL_INVALID,
  FAILURE_IDENTITY_NOT_FOUND,
  FAILURE,
  SUCCESS
};

export class Result {
  constructor(private code: number, private identity?: any, private data?: Object) {}

  isValid() {
    return this.code > 0;
  }

  getData() {
    return this.data;
  }

  getCode(): number {
    return this.code;
  }

  getIdentity() {
    return this.identity;
  }
}
