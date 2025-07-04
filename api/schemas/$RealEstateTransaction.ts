/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RealEstateTransaction = {
  properties: {
    id: {
      type: 'number',
      format: 'int32',
    },
    district: {
      type: 'District',
    },
    legalDongCode: {
      type: 'string',
    },
    contractDate: {
      type: 'string',
      format: 'date',
    },
    cancellationDate: {
      type: 'string',
      format: 'date',
    },
    lotType: {
      type: 'number',
      format: 'int32',
    },
    lotTypeName: {
      type: 'string',
    },
    mainLotNumber: {
      type: 'string',
    },
    subLotNumber: {
      type: 'string',
    },
    buildingName: {
      type: 'string',
    },
    floor: {
      type: 'number',
      format: 'int32',
    },
    buildingArea: {
      type: 'number',
      format: 'float',
    },
    landArea: {
      type: 'number',
      format: 'float',
    },
    transactionAmount: {
      type: 'number',
      format: 'float',
    },
    buildingUsage: {
      type: 'string',
    },
    constructionYear: {
      type: 'number',
      format: 'int32',
    },
    reportType: {
      type: 'string',
    },
    ownershipType: {
      type: 'string',
    },
    reportYear: {
      type: 'number',
      format: 'int32',
    },
    agentOfficeDistrictName: {
      type: 'string',
    },
  },
} as const;
