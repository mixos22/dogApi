import { step } from 'allure-js-commons';
import { DogApiRequestContext } from './context/dogApiHttpClientContext';
import {
  IGetBreedsResponseBody,
  IGetImageResponseBody,
  IGetSubBreedsResponseBody,
  TBreed,
  TBreedAndSubBreed,
  TSubBreed,
} from './types/dogApiType';
import _ from 'lodash';
import { APIRequestContext } from '@playwright/test';
import { getRandomKey } from '../utils/objectUtils';

export class DogApi {
  private readonly httpClient: APIRequestContext;

  constructor() {
    this.httpClient = DogApiRequestContext.getContext();
  }

  private readonly LIST_ALL_BREEDS_URL = `./breeds/list/all`;
  private readonly LIST_SUB_BREEDS_URL = (breed: TBreed) => `./breed/${breed}/list`;

  private readonly GET_RANDOM_BREED_IMAGE_PATH = (breed: TBreed, howManyImages: number) =>
    `./breed/${breed}/images/random/${howManyImages}`;

  private readonly GET_RANDOM_SUB_BREED_PATH = <T extends TBreed>(
    breed: T,
    subBreed: TSubBreed<T>,
    howManyImages: number,
  ) => `./breed/${breed}/${subBreed}/images/random/${howManyImages}`;

  public async getRandomBreed(): Promise<TBreed> {
    return step('Getting a random breed', async () => {
      const breeds = await this.getAllBreedsAndTheirSubBreeds();
      const randomBreed = getRandomKey(breeds) as TBreed;

      await step(`"${randomBreed}" breed is gotten`, () => {});

      return randomBreed;
    });
  }

  public async getBreedRandomImagePath<T extends TBreed>(breed: T, homManyImages: number = 1) {
    return step(`Getting random ${homManyImages} image path(s) of "${breed}" breed`, async () => {
      const url = this.GET_RANDOM_BREED_IMAGE_PATH(breed, homManyImages);

      const response = await this.httpClient.get(url);
      const randomBreedImage: IGetImageResponseBody = await response.json();
      const imagePath = randomBreedImage.message;

      await step(`Path(s) is/are fetched successfully`, () => {});

      return { [breed]: imagePath } as { [K in T]: string[] };
    });
  }

  public async getImagePathForEverySubBreedOfParticularBreed<T extends TBreed>(breed: T, howManyImages: number = 1) {
    return step(`Getting random ${howManyImages} image path(s) of each sub-breed of "${breed}" breed`, async () => {
      const subBreeds = await this.getAllSubBreedsOfParticularBreed(breed);

      let imagePathArr: Partial<{ [K in TSubBreed<T>]: string[] }> = {};

      for (const subBreed of subBreeds) {
        const typedSubBreed = subBreed as TSubBreed<T>;
        const subBreedImagePath = await this.getSubBreedRandomImagePath(breed, subBreed, howManyImages);
        imagePathArr[typedSubBreed] = subBreedImagePath;
      }

      return imagePathArr;
    });
  }

  private async getSubBreedRandomImagePath<T extends TBreed, P extends TSubBreed<T>>(
    breed: T,
    subBreed: P,
    howManyImages: number,
  ) {
    return step(
      `Getting random ${howManyImages} image path(s) of ${subBreed} sub-breed of "${subBreed}" breed`,
      async () => {
        const url = this.GET_RANDOM_SUB_BREED_PATH(breed, subBreed, howManyImages);

        const response = await this.httpClient.get(url, { failOnStatusCode: true });
        const responseBody: IGetImageResponseBody = await response.json();
        const imageUrl = responseBody.message;

        await step(`Path(s) is/are fetched successfully`, () => {});

        return imageUrl;
      },
    );
  }

  private async getAllBreedsAndTheirSubBreeds(): Promise<TBreedAndSubBreed> {
    return step('Getting a list of all breeds', async () => {
      const response = await this.httpClient.get(this.LIST_ALL_BREEDS_URL, { failOnStatusCode: true });
      const responseBody: IGetBreedsResponseBody = await response.json();
      const breeds = responseBody.message;

      await step('A list of all breeds is fetched successfully', () => {});

      return breeds;
    });
  }

  private async getAllSubBreedsOfParticularBreed<T extends TBreed>(breed: T) {
    return step(`Getting a list of sub-breeds of "${breed}" breed`, async () => {
      const url = this.LIST_SUB_BREEDS_URL(breed);

      const response = await this.httpClient.get(url);
      const responseBody: IGetSubBreedsResponseBody<T> = await response.json();
      const subBreeds = responseBody.message;

      await step(`A list of sub-breeds of "${breed}" breed is fetched successfully`, () => {});

      return subBreeds;
    });
  }
}
