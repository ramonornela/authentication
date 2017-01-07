export declare enum ResultCode {
    FAILURE_UNCATEGORIZED = -4,
    FAILURE_IDENTITY_AMBIGUOUS = -3,
    FAILURE_CREDENTIAL_INVALID = -2,
    FAILURE_IDENTITY_NOT_FOUND = -1,
    FAILURE = 0,
    SUCCESS = 1,
}
export declare class Result {
    private code;
    private identity;
    private data;
    constructor(code: number, identity?: any, data?: Object);
    isValid(): boolean;
    getData(): Object;
    getCode(): number;
    getIdentity(): any;
}
