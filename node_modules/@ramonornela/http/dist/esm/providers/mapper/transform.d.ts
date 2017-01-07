import { Response } from '@angular/http';
export declare abstract class Transform {
    abstract transform(data: Response): any;
}
