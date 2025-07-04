/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TrendMonthlyEstateDto } from '../models/TrendMonthlyEstateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TrendMonthlyEstateControllerService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns TrendMonthlyEstateDto OK
   * @throws ApiError
   */
  public getMonthlyEstateStatsDto({
    districtCode,
    period = 6,
  }: {
    districtCode: string,
    period?: number,
  }): CancelablePromise<Array<TrendMonthlyEstateDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/trend/monthly-estate/',
      query: {
        'districtCode': districtCode,
        'period': period,
      },
    });
  }
}
