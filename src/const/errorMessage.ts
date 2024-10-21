import { ApplicationName } from '../api/types/applicationNameType';

export const errorMessage = {
  TOKEN_REQUIRED_ERROR: 'Yandex OAuth token is required',
  HTTP_CONTEXT_IS_NOT_INITIALIZED_ERROR: (applicationName: ApplicationName) =>
    `"${applicationName}" http context is not initialized. Call "init()" first.`,
  FILE_UPLOAD_ERROR: (fileName: string, attempts: number) =>
    `File "${fileName}" was not uploaded after ${attempts} attempts`,
} as const;
