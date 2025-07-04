/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $District = {
  properties: {
    districtCode: {
      type: 'string',
    },
    districtName: {
      type: 'string',
    },
    province: {
      type: 'Province',
    },
    stations: {
      type: 'array',
      contains: {
        type: 'Station',
      },
    },
    transactions: {
      type: 'array',
      contains: {
        type: 'RealEstateTransaction',
      },
    },
  },
} as const;
