# WAV File Extractor demo

![Netlify](https://img.shields.io/netlify/1755123c-d13f-418e-9cda-2d9bd7874329)

## Online demo

[Online demo running on Netlify](https://clever-torte-37e944.netlify.app/)

## Running locally

```shell
yarn && yarn run dev
```

## Running tests

To run unit tests:

```shell
yarn run test
```

To start a dev server and run end-to-end tests in Cypress:

```shell
yarn run e2etest
```

To run e2e tests on an existing dev server (one started with `yarn run dev`):

- `yarn run cypress:run` to run the tests in the CLI
- `yarn run cypress:open` to open the Cypress UI
