import { defineConfig } from '@playwright/test';
import 'dotenv/config';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  fullyParallel: true,
  workers: 4,
  testDir: './tests',
  timeout: 6 * 60 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: [
    ['list', { printSteps: true, includeProjectInTestName: false }],
    ['allure-playwright', { detail: false }],
  ],
  use: {
    screenshot: 'only-on-failure',
    actionTimeout: 1 * 60 * 1000,
    baseURL: 'https://dog.ceo/dog-api/',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Dog API',
      use: {
        browserName: 'chromium',
        headless: false,
      },
    },
  ],
});
