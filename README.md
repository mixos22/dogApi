# Dog API E2E Testing Automation Framework (TAF)

This repository contains End-to-end (E2E) testing automation framework (TAF) for [Dog API](https://dog.ceo/dog-api/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

Please ensure you have installed all dependencies required for the project.

```console
npm i
npm run playwright:install
```

### Configuration

The project uses environment variables for configuration. These are stored in a file named `.env` at the project root. The `.env` file is not included in version control, as it contains sensitive information.

Please create a `.env` file in your project root and add the following environment variables:

```shell
O_AUTH_TOKEN_YANDEX=y0_AAAAAexample
BASE_URL_YANDEX_DISK='https://cloud-api.yandex.net/v1/disk/'
BASE_URL_DOG_API='https://dog.ceo/api/'

```

### Run tests

```console
npm run test
npm run test:with allure report
```

## Available NPM Scripts

```console
npm run clean                   # Clean up allure results and reports
npm run allure:generate         # Generates the allure report
npm run allure:open             # Open the allure report
npm run allure                  # Generate and then open allure report
npm run test                    # Clean up previous allure report and runs the tests
npm run test:with allure report # Runt tests and then generate and open allure report
npm run playwright:install      # Install Playwright
```

## Structure

### Tests

Test scripts are located under the tests directory.

## Allure is used for reporting in this project.

You can generate and open the allure report using the following command:

```console
npm run allure
```

## Technologies

- [Playwright](https://playwright.dev/) - Reliable end-to-end testing for modern web apps.
- [Allure](http://allure.qatools.ru/) - A flexible lightweight multi-language test report tool.
