# Requirements

https://wearethyme.notion.site/Technical-Test-Frontend-Developer-Equals-Money-3bac253b2edb4d7eb29865d8458d7295

Notes:

- I've added a button to create a new contact. It's not in the requirements, but I thought it would be a nice addition, useful for development purposes.
- I've not implemented any image editing feature, but it's probably easy to do with a library. I preferred to focus on the other requirements.

# Deployment

The app is deployed at https://equals-test.vercel.app/

# Installation

Install packages:

```
yarn
```

Run Next.js dev server:

```
yarn dev
```

# Tests

There are a few example tests:

- snapshot tests to test that a component renders consistently;
- some unit tests for functions;
- different tests on a component: user interaction when clicking on a button, visibility of elements in the page;

I've not added any test specifically targeted to css styling, however I had the chance to do that in the past while using `styled-components`.

Tests are run in a github action on pushing to `main`. (except for cypress tests. It's perfectly doable, but it takes a bit of time to configure. We have cypress tests running on github at work)

## Run jest tests

```
yarn test
```

## Run cypress tests

Open a separate shell and run Next.js dev server:

```
yarn dev
```

Run cypress:

```
yarn cypress
```

I've tested a very simple user flow: click on the contacts link, and add a new contact.

# Notes

In order to snow some knowledge of Next.js, I've decided to implement two versions of the app:

- link to the contacts page with CSR;
- link to the contacts page with SSR;

Pre-rendering the contacts page with SSR is not necessarily the best approach here, but it's a good use case to show some knowledge of the server side capabilities of Next.js.

The app takes advantage of Next.js Incremental Static Regeneration feature. The page is initially statically rendered at build time, and then regenerated every time an user navigate to it, but no more often than 10 seconds.

In this version, the contacts list will immediately displayed and revalidated by fetched from the `api/contacts` endpoint.

On the CSR page, the user will see a loading element while the data is fetched from the backend.

I've added a single breakpoint at `480px` to show some knowledge of responsive design, however the app is not intended to be mobile first and particularly optimized for different screen sizes. The breakpoints are set here: https://github.com/wnz99/growth-kitchen/blob/98ab4ea85053dea9a9e801069307d1f941808033/styles/theme.ts#L4

Chakra UI is a mobile first library, and it makes very easy to deal with responsive designs. I've written media queries in the past, many times, recently at Mode when I took over a Vue application with a custom build css framework based on BEM naming conventions.

However, nowadays, I prefer to delegate it to ready made solutions, if possible.

# Libraries used

## Chakra UI

https://chakra-ui.com/

It's a css-in-js UI library that uses style props for styling.

The reasons for my choice:

- it is very good for fast development. Styling with props makes the development experience a joy;
- it handles responsive designs perfectly;
- it is very well documented;
- it is quite complete, there are components for almost any need;
- Powerful theming capabilities, everything can be easily customized to apply your own branding and look and feel;
- Performant;
- I've seen used in production in large project and I've personally advocated and introduced it in a project a work. It was very well received by colleagues;

The main cons is that does not provide complex components such as, for example, a date picker. However, I have to say that at work I managed to implement a nice date picker in a relatively short time, and style as required.

## SWR

https://swr.vercel.app/

It's a library for data fetching from the same creators of Next.js

The reasons for my choice:

- it gives a lot of useful features out of the box https://swr.vercel.app/#features
- it integrates very well with Next.js;
- I've introduced it in a project at work, and it turned out to be a good choice;

## zod

https://zod.dev/

Yup alternative with better TypeScript support.
