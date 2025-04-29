/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TestControllerService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns string OK
     * @throws ApiError
     */
    public test(): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/test',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public getDistricts(): CancelablePromise<Record<string, Record<string, any>>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/dbtest',
        });
    }
}
