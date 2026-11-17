# Collapp Frontend

React SPA for Collapp, a marketplace connecting creative professionals with collaboration
offers. React 19, Vite, React Router 7, axios, Sass. Mobile-first (desktop layout is pending).

Talks to `collapp-backend`; the API base URL comes from `VITE_API_URL`
(defaults to `http://localhost:8080/api`).

## Commands

```bash
npm run dev      # dev server on :5173
npm test         # vitest run
npm run build    # production build
npm run lint     # eslint (currently broken: eslint-plugin-jsx-a11y is missing from package.json)
```

## Conventions

**Git — commit messages and branch names are written in English**, even though code comments
and discussion are in Spanish. Branches are `feature/kebab-case` or `fix/kebab-case`; commits
follow Conventional Commits (`fix:`, `feat:`, `docs:`). **Never add a `Co-Authored-By` line or
any other AI attribution** to commits or pull request descriptions.

**Comments are minimal.** Write a JSDoc line only when it clarifies something the name does
not, and keep it to one line whenever possible. Document the non-obvious *why*, never restate
what the code already says.

**Structure:** one folder per component, holding `Component.jsx` and `Component.scss` side by
side. Components are named exports (`export const Foo = ...`), never default. Pages live in
`pages/`, reusable pieces in `components/ui/`, feature-specific ones in `components/common/<feature>/`.

**Data access** goes through `services/*.js`, which wrap `api/axiosClient.js` and return
`response.data`. Components never call axios directly. The axios client injects the JWT from
localStorage and, on any 401, clears the session and redirects to `/login`.

**Auth state** lives in `context/AuthProvider.jsx`, consumed through the `useAuth` hook.
Route protection is handled by `routes/ProtectedRoute.jsx` and `routes/AdminRoute.jsx`.

## Code style

Readability over cleverness. Prefer verbose, structured code to compact or "smart" one-liners:
a reader should never have to decode an expression.

- **One `return` per component.** Resolve the branches beforehand into named variables and
  render them inside a single `return`, instead of early-returning a different tree per state.
  `OfferDetailPage.jsx` builds `applySection` this way.
- **No logic inside callbacks.** Handlers, `useEffect` bodies and `.map()` callbacks delegate to
  named functions; they do not carry branching of their own.
- **Named intermediate variables.** Break long or nested expressions into steps whose names
  explain the intent. Destructuring with computed keys, rest and defaults in one statement is
  exactly the kind of line this rule exists to prevent.
- **Low cyclomatic complexity.** No chains of `if`, no nested loops, no ternaries inside
  ternaries. Long conditional JSX belongs in a variable, or in its own component.
- **Single responsibility per component.** A component that fetches, filters and renders three
  unrelated sections should be split.

## Error handling

The backend returns a single error shape (`ApiError`): `error` is a stable code
(`VALIDATION_ERROR`, `NOT_FOUND`...), `message` is the text meant for the user, and `fields`
maps field names to messages on validation 400s.

**Always read errors through `utils/apiError.js`**, never off `err.response.data` directly:

```js
const apiError = getApiError(err);
if (apiError.status === 400 && hasFieldErrors(apiError)) setFieldErrors(apiError.fieldErrors);
if (apiError.formError) setGeneralError(apiError.formError);
```

`getApiError` splits field errors from the form-level error (the backend's `_form` key, for
validations that belong to no single field) and tolerates a missing response, such as a network
failure. Rendering `data.error` puts a raw code like "CONFLICT" on screen — that is a bug.

## Testing

Vitest with jsdom and Testing Library; setup in `src/test/setup.js`. Tests sit in
`__tests__/` folders next to the code they cover. Test names are descriptive sentences in
Spanish ("debe retornar ...").

Coverage is on services, hooks, context and utils. There are no component or page tests yet.
