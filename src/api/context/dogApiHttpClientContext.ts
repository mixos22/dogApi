import { APIRequestContext, request } from '@playwright/test';
import { errorMessage } from '../../const/errorMessage';

export class DogApiRequestContext {
  private static context: APIRequestContext;

  public static async init() {
    const baseURL = process.env.BASE_URL_DOG_API;

    if (!this.context) {
      this.context = await request.newContext({ baseURL });
    }
  }

  public static getContext() {
    if (!this.context) {
      throw new Error(errorMessage.HTTP_CONTEXT_IS_NOT_INITIALIZED_ERROR('Dog API'));
    }

    return this.context;
  }
}
