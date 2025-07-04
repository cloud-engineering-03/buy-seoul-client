/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { AxiosHttpRequest } from "./core/AxiosHttpRequest";
import { EstateSearchControllerService } from "./services/EstateSearchControllerService";
import { StationsControllerService } from "./services/StationsControllerService";
import { TestControllerService } from "./services/TestControllerService";
import { TrendMonthlyEstateControllerService } from "./services/TrendMonthlyEstateControllerService";
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class ApiClient {
  public readonly estateSearchController: EstateSearchControllerService;
  public readonly stationsController: StationsControllerService;
  public readonly testController: TestControllerService;
  public readonly trendMonthlyEstateController: TrendMonthlyEstateControllerService;
  public readonly request: BaseHttpRequest;
  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest: HttpRequestConstructor = AxiosHttpRequest
  ) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? process.env.API_BASE_URL ?? "http://localhost:8082",
      VERSION: config?.VERSION ?? "1.0",
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? "include",
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });
    this.estateSearchController = new EstateSearchControllerService(
      this.request
    );
    this.stationsController = new StationsControllerService(this.request);
    this.testController = new TestControllerService(this.request);
    this.trendMonthlyEstateController = new TrendMonthlyEstateControllerService(
      this.request
    );
  }
}
