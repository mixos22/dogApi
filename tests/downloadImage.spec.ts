import { TBreed } from '../src/api/types/dogApiType';
import { AllureInfo } from '../src/const/allureInfo';
import { test } from '../src/fixture/megedFixture';
import { assert } from '../src/steps/assertSteps';
import { owner, feature, story, tags } from 'allure-js-commons';

test.beforeEach(async () => {
  await owner(AllureInfo.owner.Mike);

  await feature(AllureInfo.feature.api);
  await story(AllureInfo.story.downloadImage);

  await tags(AllureInfo.tags.downloadImage, AllureInfo.tags.smoke);
});

test.describe('Check download api', () => {
  const breeds: { breed: TBreed }[] = [{ breed: 'hound' }, { breed: 'terrier' }, { breed: 'spaniel' }];

  breeds.forEach(({ breed }) => {
    test(`${breed} breed`, async ({ dogApi, yandexDisk }) => {
      const breedImagePath = await dogApi.getBreedRandomImagePath(breed, 5);
      const subBreedImagePath = await dogApi.getImagePathForEverySubBreedOfParticularBreed(breed, 5);

      const filesToUpload = { ...breedImagePath, ...subBreedImagePath };

      const folder = await yandexDisk.createFolder(breed);

      const expectedFiles = await yandexDisk.uploadFiles(folder, filesToUpload);

      const { length: expectedFilesLength } = expectedFiles;

      const actualFiles = await yandexDisk.getFilesNameFromFolderAwaited(folder, {
        expectedFilesLength,
        repeatAttempts: 15,
      });

      await assert.downloadedFilesAmount(actualFiles, expectedFiles);
    });
  });

  test('Random breed', async ({ dogApi, yandexDisk }) => {
    const breed = await dogApi.getRandomBreed();

    const breedImagePath = await dogApi.getBreedRandomImagePath(breed);
    const subBreedImagePath = await dogApi.getImagePathForEverySubBreedOfParticularBreed(breed);

    const filesToUpload = { ...breedImagePath, ...subBreedImagePath };

    const folder = await yandexDisk.createFolder(breed);

    const expectedFiles = await yandexDisk.uploadFiles(folder, filesToUpload);

    const { length: expectedFilesLength } = expectedFiles;

    const actualFiles = await yandexDisk.getFilesNameFromFolderAwaited(folder, { expectedFilesLength });

    await assert.downloadedFilesAmount(actualFiles, expectedFiles);
  });
});
