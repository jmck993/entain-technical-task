# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

```sh
yarn start    # Runs the app in development mode
yarn test     # Starts the test runner in watch mode
```

## About the App

### Usage

To start the app use `yarn start` within the project's directory. This will spin up a live a web app for this project in development mode.

For a production build you can use `yarn build`.

### Features

This app uses Neds API to fetch a list of races displaying `5` of them at a time.

The race details are displayed in a list below the filter. These show the race name, race number, meeting name, and the remaining seconds until this race starts.

When the remaining seconds until the race starts hits `0`, a countdown from `60` seconds will appear until the race notice is dismissed.

You are able to filter these races through the use of the buttons labelled `Greyhound`, `Harness`, and `Horse`. Clicking on an already set filter again will stop applying that filter.

The application maintains a list of `10` upcoming races at a time even though it displays `5`. If Neds API supported a `category_id` it could be used to retrieve a list of `5` races matching the specified category. However given the API endpoint to work with as is, there is an indeterminate amount of races to be retrieved before receiving `5` of the races with the specific category so instead this list of `10` is retrieved.

### Technical Detail

#### Redux
This app uses Redux to maintain its application flow.

These Redux features have been grouped into the `src/redux/` directory.

A series of actions are specified in `actions.ts`.

The main `reducer` is stored in `reducer.ts`.

The middleware for calling the Neds API is in `refreshMiddleware`.

All selectors are stored in `selectors.ts`.

The application state type and its default state are stored in `state.ts`.

The function to create the application's "store" is in `store.ts` which can optionally be given middleware.

| Action | Role |
|-|-
| `SetRacesAction` | Sets the list of the 10 races
| `RefreshAction` | Updates the list of the 10 races (realized in middleware)
| `ToggleFilterMode` | Sets or unsets the filter for the displayed races

#### Code Formatting

This app uses Prettier to maintain its formatting.

You can use `npx prettier --write src` to format the code within the `/src/` directory.

#### Testing

Using `yarn test` you can start the test runner.

Some logic in the `selectors` and `store` object have been tested to ensure the basic lifecycle of the application given the appropriate actions.

TypeScript assists with its type related checks to get rid of many invalid states. Strict types have been reused throughout the application.

Logic within `Race.tsx` seems the most complex however React guidelines still recommend to preserve the logic inside `setEffect` instead of abstracting it into a function to make the dependencies clearer. This could be further revised to form something to test against in the future.

For the sake of time and technical complexity this application doesn't dive into a use of Selenium and/or Puppeteer but perhaps React's new tooling could assist here but I am yet to get familiar with these new tools.
