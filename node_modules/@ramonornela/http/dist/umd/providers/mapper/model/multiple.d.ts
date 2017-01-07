import { Response } from '@angular/http';
import { Transform } from '../transform';
export declare const TypeModel: {
    Simple: string;
    Collection: string;
};
export declare class ModelMultiple implements Transform {
    private mapper;
    private types;
    constructor(mapper: {
        [key: string]: MapperOptions;
    });
    addType(type: string, model: any): this;
    transform(data: Response): {};
}
export interface MapperOptions {
    type: string;
    model: any;
    path?: string;
}
