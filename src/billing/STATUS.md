# Billing — TO IMPLEMENT (hidden)

No route, no nav entry, no UI until a real provider lands.

## Legacy behavior (archived, do NOT replicate)
`src/_archive/pricing-ui/PaymentMethod.jsx` simulated payment: local regex
validation, then `setDoc(users/{uid}, { memberType: 'premium' | true })`.
Note the inconsistency: context set `'premium'` (string), Firestore write set
`true` (boolean). Guards must treat any truthy `memberType` as premium.

## Plan data (preserved)
Standard 0, Premium 2.99 — see `src/billing/interfaces/plan.ts`.

## Future: Stripe
Add `src/billing/repositories/stripe.repository.ts` behind the same
`memberType` write shape (boolean), then expose `/billing` route + menu entry.
