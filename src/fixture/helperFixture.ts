import test, { APIRequestContext } from '@playwright/test';
import { YandexRequesterContext } from '../api/context/yandexDiskHttpClientContext';
import { DogApiRequestContext } from '../api/context/dogApiHttpClientContext';

type HelperFixture = {
  yandexHttpContent: APIRequestContext;
  dogApiHttpContent: APIRequestContext;
};

export const helperFixture = test.extend<HelperFixture>({
  yandexHttpContent: [
    async ({}, use) => {
      await YandexRequesterContext.init();
      await use(YandexRequesterContext.getContext());
    },
    { auto: true },
  ],
  dogApiHttpContent: [
    async ({}, use) => {
      await DogApiRequestContext.init();
      await use(DogApiRequestContext.getContext());
    },
    { auto: true },
  ],
});
