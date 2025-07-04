/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StationsDto } from '../models/StationsDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class StationsControllerService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns StationsDto OK
   * @throws ApiError
   */
  public getSubwayStations({
    line = 1,
  }: {
    line?: number,
  }): CancelablePromise<Array<StationsDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/stations',
      query: {
        'line': line,
      },
    });
  }
}
