/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Station = {
  properties: {
    stationId: {
      type: 'number',
      format: 'int32',
    },
    stationName: {
      type: 'string',
    },
    stationNameEng: {
      type: 'string',
    },
    latitude: {
      type: 'number',
      format: 'float',
    },
    longitude: {
      type: 'number',
      format: 'float',
    },
    district: {
      type: 'District',
    },
  },
} as const;
