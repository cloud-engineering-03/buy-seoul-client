/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Province = {
  properties: {
    provinceCode: {
      type: 'string',
    },
    provinceName: {
      type: 'string',
    },
    districts: {
      type: 'array',
      contains: {
        type: 'District',
      },
    },
  },
} as const;
