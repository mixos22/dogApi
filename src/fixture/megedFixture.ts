import { mergeTests } from '@playwright/test';
import { helperFixture } from './helperFixture';
import { testData } from './testDataFixture';

export const test = mergeTests(testData, helperFixture);
