/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EstateSearchDto } from '../models/EstateSearchDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class EstateSearchControllerService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns EstateSearchDto OK
   * @throws ApiError
   */
  public searchByStationAndBudget({
    stationName,
    maxPrice,
  }: {
    stationName: string,
    maxPrice: number,
  }): CancelablePromise<Array<EstateSearchDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/search',
      query: {
        'stationName': stationName,
        'maxPrice': maxPrice,
      },
    });
  }
}
