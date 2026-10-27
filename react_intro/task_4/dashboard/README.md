# Holberton school dashboard

React intro dashboard with notifications, a sign-in form, and a footer.

## Run locally

```sh
npm ci
npm run dev
```

## Check the application

```sh
npm test -- --watchAll=false --runInBand
npm run build
```

## Deploy to GitHub Pages

```sh
npm run deploy
```

The predeploy script builds the application. The deploy script publishes `dist/`
to the `gh-pages` branch and includes `.nojekyll`.

In repository Settings > Pages, select "Deploy from a branch", `gh-pages`,
and `/(root)`.

Live dashboard: https://ironplayer2009.github.io/holbertonschool-web_react/

The same URL is recorded in `holberton-dashboard.txt` for task 8.
