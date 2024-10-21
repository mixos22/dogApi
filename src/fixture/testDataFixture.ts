import test from '@playwright/test';
import { DogApi } from '../api/dogApi';
import { YandexDisk } from '../api/yandexDiskApi';

type testDataFixture = {
  dogApi: DogApi;
  yandexDisk: YandexDisk;
};

export const testData = test.extend<testDataFixture>({
  dogApi: async ({}, use) => {
    await use(new DogApi());
  },
  yandexDisk: async ({}, use) => {
    await use(new YandexDisk());
  },
});
