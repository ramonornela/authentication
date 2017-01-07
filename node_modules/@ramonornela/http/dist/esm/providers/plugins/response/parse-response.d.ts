import { Response } from '@angular/http';
export declare abstract class ParseResponse {
    abstract parse(response: Response): void;
}
