/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { District } from './District';
export type RealEstateTransaction = {
  id?: number;
  district?: District;
  legalDongCode?: string;
  contractDate?: string;
  cancellationDate?: string;
  lotType?: number;
  lotTypeName?: string;
  mainLotNumber?: string;
  subLotNumber?: string;
  buildingName?: string;
  floor?: number;
  buildingArea?: number;
  landArea?: number;
  transactionAmount?: number;
  buildingUsage?: string;
  constructionYear?: number;
  reportType?: string;
  ownershipType?: string;
  reportYear?: number;
  agentOfficeDistrictName?: string;
};

