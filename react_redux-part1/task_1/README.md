### Task 1. Authentication Slice

Redux Toolkit's `createSlice` simplifies Redux state management by automatically generating action creators and action types, while using Immer under the hood to allow intuitive state updates.

In this task, you'll create your first Redux slice to manage authentication state, establishing the foundation for centralized state management in your React application.

**Instructions:**

- Create an `authSlice` in `src/features/auth/authSlice.js` to manage authentication state
- Define an `initialState` object with:
  - `user` object containing `email` and `password` (both empty strings)
  - `isLoggedIn` boolean (false)
- Implement two reducers using `createSlice`:
  - `login`: Updates user credentials from action payload and sets `isLoggedIn` to true
  - `logout`: Resets user credentials to empty strings and sets `isLoggedIn` to false
- Export the reducer as default and actions (`login`, `logout`) as named exports
- Create tests in `src/tests/authSlice.spec.js` that verify:
  - The slice returns correct initial state by default
  - Login action updates state correctly with payload data
  - Logout action resets state to initial values

**Hint:** Redux Toolkit's `createSlice` uses Immer internally, allowing you to write code that looks like mutations (e.g., `state.user.email = action.payload.email`) but actually produces immutable updates.

**Requirements:**

- Your React application's core features remain intact and work as expected
- All unit tests PASS (both new and existing)
- No console warnings or errors
- No lint errors

### Task 2. Notifications Slice

In this task, you will create a Redux slice called `notificationsSlice` to manage the notifications state of a React application.

This slice will handle fetching notifications, marking notifications as read, and controlling the visibility of the notifications drawer.

In the `notificationsSlice.js` file:

Create an `initialState` object to represent the initial notifications state. This object should include:

- A `notifications` array: Initialized as an empty array.
- A `displayDrawer` boolean: Initialized as true.

**Set Up the API Configuration:**

- Define a constant `API_BASE_URL` to store the base URL of your API (e.g., `http://localhost:5173`)
- Create an `ENDPOINTS` object to store the API endpoints. For this task, include:
  - notifications: The endpoint to fetch notifications (e.g., `${API_BASE_URL}/notifications.json`)

**Create and export the `fetchNotifications` Async Thunk:**

- Use the `createAsyncThunk` function to handle fetching notifications from the API
- Provide the action type string `'notifications/fetchNotifications'` as the first argument to createAsyncThunk
- The thunk should:
  - Fetch the notifications from the ENDPOINTS.notifications endpoint
  - Update the notification with id `3 to include the latest notification from the `getLatestNotification` utility function
  - Return the updated notifications array.

Create the `notificationsSlice` object using the Redux Toolkit `createSlice` function, and ensure that:

- The slice is named `notifications`
- The `initialState` object is passed as the default state of the slice
- The slice includes the following reducers:
  - `markNotificationAsRead` Reducer:
    - Removes a notification from the notifications array based on its id
    - Log to console the removed notification id (the same you applied in the markNotificationAsRead handler before)
  - `showDrawer` Reducer:
    - Sets displayDrawer to true
  - `hideDrawer` Reducer:
    - Sets displayDrawer to false.
- The slice includes an `extraReducers` section to handle the `fetchNotifications` async thunk:
  - Updates the notifications array with the fetched data when the fetchNotifications thunk is fulfilled.
- Don't forget to export the `notificationsSlice` reducer as the default export and the actions (`markNotificationAsRead`, `showDrawer`, `hideDrawer`) as named exports.

**Tip:**

The `showDrawer` and `hideDrawer` actions are simple state updates, so there's no need for a payload.

**Tests:**

Check that the `notificationsSlice`:

- Returns the correct initial state by default
- fetches notifications data correctly
- Removes a notification correctly when the `markNotificationAsRead` action is dispatched
- Toggles the `displayDrawer` state correctly when the `showDrawer` and `hideDrawer` actions are dispatched

**Requirements:**

- Your React application's core features and state management remain intact and work as expected
- Your new unit tests PASS
- No console warnings or errors
- No lint errors.

### Task 3. Courses Slice

In this task, you will create a Redux slice called `coursesSlice` to manage the courses state of a React application.

This slice will handle fetching courses from an API and resetting the courses state when the user logs out.

Create an `initialState` object to represent the initial courses state. This object should include:

- A courses array: Initialized as an empty array

**Set Up the API Configuration:**

Define a constant `API_BASE_URL` to store the base URL of your API (e.g., `http://localhost:5173`) Create an ENDPOINTS object to store the API endpoints. For this task, include:

- courses: The endpoint to fetch courses (e.g., `${API_BASE_URL}/courses.json`)

**Create and export the `fetchCourses` Async Thunk:**

- Use the `createAsyncThunk` function to handle fetching courses from the API
- Provide the action type string `'courses/fetchCourses'` as the first argument to createAsyncThunk
- The thunk should:
  - Fetch the courses from the ENDPOINTS.courses endpoint
  - Return the fetched courses data.

**Create the `coursesSlice`:**

- Use the Redux Toolkit `createSlice` function to create the slice. Ensure that:
  - The slice is named `courses`
  - The `initialState` object is passed as the default state of the slice
  - The slice includes an `extraReducers` section to handle the fetchCourses async thunk:
    - Updates the courses array with the fetched data when the fetchCourses thunk is fulfilled
- The slice listens for the `logout` action from the `authSlice` and resets the courses state to its initial value
- Export the `coursesSlice` reducer as the default export

**Tests:**

Check that the `coursesSlice`:

- Returns the correct initial state by default
- fetches correctly the courses data
- resets the courses array to empty whenever the `logout` action is dispatched

**Requirements:**

- Your React application's core features and state management remain intact and work as expected
- All your new unit tests PASS
- No console warnings or errors
- No lint errors