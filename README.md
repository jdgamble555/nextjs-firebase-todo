# Firebase Todo

A Next.js App Router app with Google authentication and realtime Firestore todos.

## Setup

Use Node.js 20.9 or newer (an active LTS release is recommended).

```sh
npm ci
```

Create `.env.local` with `NEXT_PUBLIC_FIREBASE_CONFIG` containing your Firebase web app configuration as a JSON object. Enable Google authentication and configure Firestore rules for your users. The About page reads the existing `about/ZlNJrKd6LcATycPRmBPA` document at request time. The todo query uses `uid` and `createdAt`; deploy the supplied `firestore.rules` and `firestore.indexes.json` in your Firebase project. Building the app does not deploy them. If older todos use `created`, copy those timestamps to `createdAt`: Firestore ordering excludes documents without that field.

```sh
npm run dev
```

Open http://localhost:3000.

## Checks and production

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## SolidStart parity

This app ports the [SolidStart Firebase Todo example](https://code.build/p/p0UcKV/solidstart-todo-app-with-firebase.md) to React and the Next.js App Router. It keeps the same UI, Google sign-in, user-filtered realtime listener, timestamp converter, generated example task text, action error results, and per-item error messages. `UserProvider` owns the auth state and `setUser`, and `useUser()` reads the context through `getUser`; `useTodos()` reads the context directly. Both listeners unsubscribe on unmount, and the todo listener is replaced when the user changes.

Todos store `uid`, `text`, `complete`, and `createdAt`; completion changes write `updatedAt`. `addTodo(text)`, `updateTodo(id, complete)`, and `deleteTodo(id)` return `{ error: string | null }`. The form trims input and generates a new example only after a successful write.

The About route is a dynamic server component. Its server-only Firestore Lite reader validates `name` and `description` with Valibot and follows the same public-read rules as the reference.

To verify against your Firebase project: sign in, add a task, toggle completion, delete it, and check realtime changes in a second signed-in tab. Sign out to confirm the list disappears, then visit `/about`.

## Structure

- `src/app`: routes, root layout, and global CSS
- `src/components`: todo UI
- `src/lib`: Firebase setup, authentication provider, and data hooks
- `public`: static assets

The `@/*` alias resolves to `src/*`. Next.js uses Turbopack by default. ESLint uses a flat configuration, and Tailwind CSS uses the PostCSS plugin and CSS import without a legacy JavaScript configuration.

TypeScript stays on version 6 because the current Next.js lint parser does not support TypeScript 7. ESLint stays on version 9 to satisfy the bundled lint plugins' peer requirements.
