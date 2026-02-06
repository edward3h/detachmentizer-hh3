# Implementation Notes

The application is a single web page, written in TypeScript, HTML and CSS.
It runs in the browser: there is no backend.

## TypeScript

* Prettier and ESLint for formatting and checking.
* Split into files and types as appropriate.

## Build

* In development, use Vite to serve the page, so it dynamically updates when code is edited.
* For production, build into static assets that can be copied to a web host.

## Data

* Store a user's selections in local storage, so they can continue if they come back to the page later.

## CSS

* Include light and dark themes, selected based on the system setting.
