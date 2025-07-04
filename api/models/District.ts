/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Province } from './Province';
import type { RealEstateTransaction } from './RealEstateTransaction';
import type { Station } from './Station';
export type District = {
  districtCode?: string;
  districtName?: string;
  province?: Province;
  stations?: Array<Station>;
  transactions?: Array<RealEstateTransaction>;
};

