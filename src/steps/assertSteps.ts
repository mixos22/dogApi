import { expect } from '@playwright/test';
import {step } from 'allure-js-commons';

export const assert = {
  downloadedFilesAmount: (expectedFiles: string[], actualFiles: string[]) =>
    step(`Check amount of downloaded files`, async () => {
      expect(actualFiles).toEqual(expectedFiles);
    }),
};
