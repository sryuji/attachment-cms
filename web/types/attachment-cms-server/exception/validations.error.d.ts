import { ValidationError } from 'class-validator';
export declare class ValidationsError extends Error {
    readonly sourceList: ValidationError[] | string[];
    constructor(sourceList?: ValidationError[] | string[]);
    getMessages(): string[];
    private getConstraintsMessages;
}
