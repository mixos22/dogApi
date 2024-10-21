import { step } from 'allure-js-commons';
import { YandexRequesterContext } from './context/yandexDiskHttpClientContext';
import { APIRequestContext } from '@playwright/test';
import { errorMessage } from '../const/errorMessage';
import { faker } from '@faker-js/faker';
import { IGetFilesResponseBody } from './types/dogApiType';
import { attempt } from 'lodash';

type UploadStatus = 'failed' | 'success' | 'in-progress';

export class YandexDisk {
  private readonly httpClient: APIRequestContext;

  constructor() {
    this.httpClient = YandexRequesterContext.getContext();
  }

  private readonly RECOURCES_URL = `./resources`;
  private readonly UPLOAD_URL = `${this.RECOURCES_URL}/upload`;

  public async createFolder(name: string) {
    return step(`Creating folder ...`, async () => {
      const id = faker.string.nanoid();
      const folderName = `${name}-${id}`;
      const params = { path: folderName };

      await this.httpClient.put(this.RECOURCES_URL, { params, failOnStatusCode: true });

      await step(`Folder "${folderName}" successfully created`, () => {});

      return folderName;
    });
  }

  public async uploadFiles(folderName: string, filePath: { [K in string]: string[] }) {
    return step(`Uploading files to "${folderName}" folder`, async () => {
      const fileNameArr = [];

      for (const [key, pathArr] of Object.entries(filePath)) {
        for (const filePath of pathArr) {
          const id = faker.string.nanoid();
          const fileName = `${key}-${id}`;

          const params = { path: `/${folderName}/${fileName}`, url: filePath };

          let attempts = 1;
          let currentStatus = 'failed';

          while (currentStatus === 'failed' && attempts <= 10) {
            const response = await this.httpClient.post(this.UPLOAD_URL, {
              params,
              failOnStatusCode: true,
            });

            const body: {
              href: string;
              method: string;
              templated: boolean;
            } = await response.json();

            const { href } = body;

            let attemptCount = 1;

            await step(
              `Waiting status changing from 'in-progress' to 'failed' or 'success, file name: ${fileName}'`,
              async () => {
                do {
                  const statusResponse = await this.httpClient.get(href, { failOnStatusCode: true });
                  const body: { status: UploadStatus } = await statusResponse.json();
                  const { status } = body;

                  currentStatus = status;

                  await step(`Response status is "${currentStatus}", attempt: ${attemptCount}`, async () => {});

                  attemptCount++;
                } while (currentStatus === 'in-progress' && attemptCount <= 30);
              },
            );

            if (currentStatus === 'failed') {
              await step(`File "${fileName}" was not uploaded! (attempt: ${attempts})`, () => {});
            }

            attempts++;
          }

          if (currentStatus === 'failed') {
            throw new Error(errorMessage.FILE_UPLOAD_ERROR(fileName, attempts));
          }

          await step(`File "${fileName}" successfully uploaded`, () => {});

          fileNameArr.push(fileName);
        }
      }

      return fileNameArr.sort();
    });
  }

  public async getFilesNameFromFolderAwaited(
    folderName: string,
    { expectedFilesLength, repeatAttempts }: { expectedFilesLength: number; repeatAttempts?: number },
  ) {
    return step(`Getting files from "${folderName}" folder waiting expected element amount to be present`, async () => {
      let lengthIsDiff = true;
      let attempt = 1;

      let actualLength = undefined;
      let fileNames: string[] = [];
      let maxAttempts = repeatAttempts ?? 4;

      while (lengthIsDiff && attempt <= maxAttempts) {
        fileNames = await this.getFilesNameFromFolder(folderName);

        const { length } = fileNames;

        actualLength = length;
        lengthIsDiff = expectedFilesLength !== actualLength;

        await step(`Attempt: ${attempt}, expected: ${expectedFilesLength} elements, gotten: ${actualLength}`, () => {});

        attempt++;
      }

      return fileNames.sort();
    });
  }

  public async getFilesNameFromFolder(folderName: string) {
    return step(`Getting files from "${folderName}" folder`, async () => {
      const params = { path: `/${folderName}`, limit: 300 };

      const response = await this.httpClient.get(this.RECOURCES_URL, {
        params,
        failOnStatusCode: true,
      });

      await step('Files are fetched successfully!', () => {});

      const files: IGetFilesResponseBody = await response.json();
      const items = files._embedded.items;

      const filesName = items.map(item => item.name);

      return filesName.sort();
    });
  }
}
