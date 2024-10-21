import { APIRequestContext, request } from '@playwright/test';
import { errorMessage } from '../../const/errorMessage';

export class YandexRequesterContext {
  private static context: APIRequestContext;

  public static async init() {
    const token = process.env.O_AUTH_TOKEN_YANDEX;

    if (!token) {
      throw new Error(errorMessage.TOKEN_REQUIRED_ERROR);
    }

    const baseURL = process.env.BASE_URL_YANDEX_DISK;
    const extraHTTPHeaders = { Authorization: token };

    if (!this.context) {
      this.context = await request.newContext({ baseURL, extraHTTPHeaders });
    }
  }

  public static getContext() {
    if (!this.context) {
      throw new Error(errorMessage.HTTP_CONTEXT_IS_NOT_INITIALIZED_ERROR('Yandex Disk'));
    }

    return this.context;
  }
}
