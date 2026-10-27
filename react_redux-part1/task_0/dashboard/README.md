# React Redux (Part 1) - Task 0

The dashboard is reorganized to prepare for the Redux tasks.

- `src/components/` contains Header, Footer, BodySection,
  BodySectionWithMarginBottom, HOC, NotificationItem, and Notifications.
- `src/pages/` contains Login and CourseList, with CourseListRow nested inside
  CourseList.
- `src/hooks/useLogin.jsx` manages the login form.
- `src/utils/` contains shared utilities and their tests.
- `src/tests/App.spec.js` contains the application tests.
- `src/assets/` contains the Holberton logo and `close-icon.png`.
- `src/app/` and `src/features/` contain the new Redux files required by task 0.
  Their implementations are introduced in the following tasks. The dashboard
  continues to use `appReducer.js` at this stage.
- `public/courses.json` and `public/notifications.json` supply dashboard data.

## Install and run

```sh
npm ci
npm run dev
```

Open the default development URL, http://localhost:5173/.

## Verify

```sh
npm test -- --runInBand
npm run build
```

Tests live alongside their components and utilities, except the application test,
which lives in `src/tests/`. Axios requests are mocked in Jest.
