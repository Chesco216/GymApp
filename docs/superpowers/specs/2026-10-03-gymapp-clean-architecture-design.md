# GymApp Clean Architecture — Design Spec
Date: 2026-10-03
Status: draft for user review
Scope: file organization + clean architecture only (no Stripe implementation, no Social revival)

## 1. Intent
- Reorganize first React+Firebase project (works on Vercel, no architecture) into independent feature modules with clear boundaries.
- Core domains to keep first-class: `auth`, `landing` (public, includes Calculator + Macros table as public nutrition tools), `diet` (AI), `routine` (AI), `profile` (dashboard composing diet+routine).
- Hidden / deferred: `billing` (current `src/components/PaymentMethod.jsx` only flips `memberType` via `setDoc`, no real transaction — hide routes, keep stub for future Stripe), `social` (unrouted, `useEffect [post]` loop in `src/Screens/Social.jsx:54-58` — archive), old `Prices` UI (archive, keep plan data as stub).
- Constraints: keep Firebase Auth/Firestore/Storage + Vercel + Gemini (`@google/generative-ai` in `package.json:14`), migrate JS→TS during restructure.
- Success: `ui` never imports `firebase/*` directly; modules import only own `interfaces/dtos` + `src/common/*`; `common` imports nothing from modules; `tsc --noEmit` + `vite build` pass.

## 2. Current state (evidence)
- `src/App.jsx:15-36`: routing + `useState('info')` for `/profile/:option`, wraps `UserProvider`, routes `/, /calculator, /macros, /prices, /login, /terms, /info-form, /signin, /profile, /profile/:option`. `Social`, `Diet`, `Routines` screens exist but unrouted.
- `src/components/`: 30 files flat — `DietGrid/DietCard/DietModal`, `RoutineGrid/RoutineCard/RoutineModal`, `Social*`, `InfoForm/InfoProfile`, `PriceCard/PaymentMethod`, primitives `Header/Loader/SVGS/SelectBox`.
- `src/Screens/`: 12 files, `Login.jsx` vs `Signin.jsx` naming, `Diet.jsx`/`Routines.jsx` placeholders, `Landing.jsx:8-36` standalone marketing (no macros), `Macros.jsx:10-97` separate `/macros` with `SearchBar/fetchMacros/searchFoodByName`, `Calculator.jsx:99-108` links to `/macros`, `Profile.jsx:42-45` fetches `getDiets/getRoutines` directly.
- `src/services/`: mixes AI (`prompt.js`, `createDiet.js`, `createRoutine.js`), Zod (`dietSchema.js`, `routineSchema.js`), Firestore (`getDiets.js`, `getRoutines.js`, `fetchMacros.js`, `searchFoodByName.js`), social auth (`googleAuth.js`, `facebookSignin.js`).
- `src/context/UserProvider.jsx:7-26`: `localStorage + getDoc(doc(db,'users',id))` coupled in context.
- `src/services/firebase.js:9-17`: hardcoded keys, must move to Vite env.
- Graph: 346 nodes, 647 edges, 47 communities, gods `react(39), firebase(18), userContext(16)`, cohesion 0.06–0.14 on core.

## 3. Target layout (flat `src/<domain>`, familiar names)
```
src/
  App.tsx, main.tsx, router.tsx, providers.tsx, index.css, vite-env.d.ts
  auth/interfaces/{user.ts, session.ts} dtos/{auth.dto.ts} hooks/{useSession.ts, useAuthGuard.ts} repositories/{auth.repository.ts, session.storage.ts} components/{LoginPage, SigninPage}
  landing/interfaces/{food.ts} dtos/{food.dto.ts} hooks/{useMacros.ts, useCalculator.ts} repositories/{macros.repository.ts} components/{LandingPage, CalculatorPage, MacrosPage, SearchBar, MacrosRow, SelectBox}
  diet/interfaces/{diet.ts} dtos/{diet.dto.ts (from dietSchema.js)} hooks/{useDiets.ts, useCreateDiet.ts} repositories/{diet.repository.firebase.ts, diet.ai.gemini.ts (prompt.js+createDiet.js)} components/{DietGrid, DietCard, DietModal, DietModalCard, EmptyDiet}
  routine/interfaces/{routine.ts} dtos/{routine.dto.ts (from routineSchema.js)} hooks/{useRoutines.ts, useCreateRoutine.ts} repositories/{routine.repository.firebase.ts, routine.ai.gemini.ts} components/{RoutineGrid, RoutineCard, RoutineModal, ExerciseView, EmptyRoutine}
  profile/interfaces/{profile.ts} dtos/{profile.dto.ts} hooks/{useProfile.ts} repositories/{profile.repository.firebase.ts} components/{ProfilePage, ProfileUpdatePage, InfoForm, InfoProfile, MenuProfile}
  billing/STATUS.md (hidden, to-implement Stripe) interfaces/{plan.ts} dtos/{plan.dto.ts}
  common/interfaces/{result.ts, errors.ts} components/{Header, Loader, Loading, SVGS, Modal} firebase/{client.ts} hooks/{useAuthGuard.ts} utils/{cn.ts, format.ts}
  _archive/social/{Social.jsx, SocialMenu, SocialPubGrid, SocialPubs, SocialLeftMenu} _archive/pricing-ui/{Prices.jsx, PriceCard.jsx, PaymentMethod.jsx, ChangePlan.jsx}
```
- Naming maps to clean layers: `interfaces+dtos`=domain, `hooks`=application, `repositories`=infrastructure, `components`=ui.
- Dependency rule: module → own `interfaces/dtos` + `common/*` only. `common` → nothing in modules. `profile` composes `diet/routine` via hooks, not component internals.

## 4. Data flow (per domain, example diet)
`components/DietGrid.tsx` → `hooks/useDiets.ts` (loading/error) → `repositories/diet.repository.firebase.ts` (`getDiets`) + `diet.ai.gemini.ts` (`dietPrompt`+`createDiet`) → `dtos/diet.dto.ts` Zod validates → `interfaces/diet.ts` typed entity to UI.
Same for `routine`, `landing` (`useMacros` wraps `fetchMacros/searchFoodByName`), `auth` (`useSession` replaces `UserProvider` mix with `session.storage.ts` + `auth.repository.ts`).

## 5. Routing + guards (`src/router.tsx`)
- Public: `/, /calculator, /macros, /login, /signin, /terms`.
- Protected `<RequireAuth>`: `/profile, /profile/:option, /info-form, /diet/*, /routine/*`. `ProfileUpdate` reads `:option` param, deletes `menuOption` state.
- Hidden (no route, no nav): `/prices, /payment, /social`. `billing/` exposes no component until Stripe.
- `Header` nav reflects this: Landing/Calculator/Macros public, Profile gated.

## 6. Env + errors
- `src/services/firebase.js` init → `src/common/firebase/client.ts` reading `VITE_FIREBASE_*` + `VITE_GEMINI_KEY`. Old hardcoded config deleted. `vercel.json` SPA rewrite kept.
- Errors: `common/interfaces/result.ts` `Result<T> = {ok:true,data}|{ok:false,error:AppError}`; repositories catch Firebase/Gemini errors to `AppError{code,message}`; hooks expose `error` string to UI; no `console.log` user flows (replace `Profile.jsx`, `PaymentMethod.jsx` logs).

## 7. Testing
- `vitest` (already in `package.json:34`): domain pure tests (`getProtCal`, Zod dtos), hook tests (`useDiets` empty/error/success with mocked repos), repo contract tests with emulator or mocks. No e2e in this phase.
- Gates: `tsc --noEmit`, `eslint`, `vitest run`, `vite build`.

## 8. Migration notes (no behavior change in this phase)
- Move only + type + decouple; keep Spanish copy, CSS files colocated (`Landing.css` → `landing/components/Landing.css` or CSS modules later).
- `src/assets/getProtCal.js` dedup vs `src/services/getProtCal.js` → single `landing/domain/calc.ts` + tests.
- `SocialMenu.jsx:63` syntax warning noted in AST extraction — archived, not fixed.
- Billing stub: `billing/STATUS.md` documents simulated `memberType` flip vs future Stripe `stripe.stub.ts`.

## 9. Out of scope
Stripe integration, Social fix/revival, Prices UI, i18n, theming, e2e, backend migration.
