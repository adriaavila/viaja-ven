# MVP Notes & Assumptions

## Data Layer
- All data is mock/static. `lib/mock/` contains 16 experiences, 3 curated routes, and a deterministic recommendation engine.
- Plan state is stored in React Context + `localStorage`. Replace with Convex when backend is ready — the seam is clean in `lib/plan-context.tsx`.

## Routing
- Experience detail uses `/x/[slug]` (short, SPA-friendly).
- Itinerary uses `/itinerary/[id]`. The `id` is a timestamp-based mock ID generated at plan time.

## Images
- All images are from Unsplash. Configure `next.config.ts` `remotePatterns` to add real CDN domains when available.

## Confirmation Flow
- WhatsApp opens `wa.me/` with a prefilled message. Replace the phone number placeholder in `ConfirmationModal.tsx`.
- Email and Web form submissions are mocked (local state only). Wire to Convex mutations or API routes in production.

## Plan Generation
- `generateItinerary()` in `lib/mock/recommend.ts` scores experiences by interest overlap, filters by budget, and assigns time slots. It's deterministic and extensible.

## Accessibility
- All interactive elements have `aria-label` or visible text.
- Modal uses native `<dialog>` with focus management and ESC close.
- Stepper uses `aria-valuemin/max/now`.

## Not Implemented (Out of MVP scope)
- Authentication / user accounts
- Real payment processing
- Map integration (Google Maps links used as placeholders)
- Search / text filtering
- Multi-language support (Spanish only for now)
