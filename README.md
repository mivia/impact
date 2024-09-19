## Getting Started

Firstly, install all required dependencies by running:

```bash
npm i
```

Secondly, start a local server by running:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

I have implemented e2e, component, snapshot and unit tests to test out some of the scenarios.

E2E tests are written using Playwright and can be run with (be sure you have local server running beforehand):

```bash
npm run e2e
```

Component, snapshot and unit tests are written using Jest and can be run with:

```bash
npm run test
```

## Extras

I added fetching & displaying all the available products on the home route (/) - I guess it looks better this way.

## Things I haven't done due to time limit
1) A more verbose and clear persistance layer for the cart items (https://zustand.docs.pmnd.rs/integrations/persisting-store-data)
2) Implementation of loading templates aka loading.js (https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
3) Implement an onOutsideClick hook that would enable me to close the mobile navigation to close in all needed scenarios
4) Adjust the currency to users locale data
5) Few design changes that would make the shop even more appealing!
