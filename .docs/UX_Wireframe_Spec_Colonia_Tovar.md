# Turismo Gastronómico – Colonia Tovar  
## UX Wireframe Spec (MVP)

### UX Principles
- **Mobile-first**
- **One primary action per screen**
- **Editorial feel** (generous spacing + strong photography)
- **Zero-login until confirmation**
- **Fast paths**: browse → shortlist → plan → confirm

---

## IA. Home `/`

### Header
- Left: Logo
- Center (desktop): Explore | Categories
- Right: Primary CTA (contextual): **Build my plan**

### Hero
- Headline: **“Plan your perfect day in Colonia Tovar.”**
- Subheadline: short, calm, editorial
- Primary CTA: **Build my plan**
- Secondary CTA: **Explore experiences**

**Visual**
- Full-width image
- Overlay gradient: `primary.dark → transparent`

### Sections
1. **Trending this weekend**
   - Horizontal scroll cards
2. **Curated routes**
   - 3 tiles (Coffee / Food / Family)
3. **Why it works**
   - Fast confirmation
   - Local partners
   - Clear itineraries

**Mobile**
- Optional sticky bottom bar (non-WhatsApp):
  - Left: Explore
  - Right: Build plan

---

## IB. Explore `/explore`

### Layout
- Filters (drawer on mobile)
- Grid cards (2-col on mobile, 3–4 on desktop)

### Filters (MVP)
- Category
- Time of day
- Budget
- Group type

### Card UX
- Image
- Title
- Tags
- Price range
- Hover/press: **Add to plan** (secondary action)

---

## IC. Experience Detail `/x/[slug]`

### Hero
- Image gallery
- Gradient overlay using palette

### Content
- Title + tags
- Quick facts row (duration, meeting point, language, accessibility)
- Short description
- “What you’ll do” bullets
- Map preview
- Similar experiences

### CTA
- Desktop: sticky side card
- Mobile: sticky bottom bar
  - Primary: **Add to plan**
  - Secondary: Save (optional)

---

## ID. Planner Wizard `/plan`

### Step 1 — Date & time
- Calendar
- Time chips

### Step 2 — People & interests
- Group size
- Interest chips (multi-select)

### Step 3 — Budget & pace
- Budget chips
- Pace selector

### Result
- Itinerary preview
- Swap / remove items
- CTA: **Confirm / Request availability** (channel can be WhatsApp, email, or form — not always visible)

---

## IE. Itinerary `/itinerary/[id]`

### Layout
- Timeline layout
- Each stop as a card

### Actions
- Open map
- Share itinerary
- Request confirmation (opens contact modal)

### Confirmation Modal
- Channel selector:
  - WhatsApp
  - Email
  - In-app form
- Prefilled message/summary

---

## MVP Navigation Map
- `/` Home
- `/explore` Explore
- `/x/[slug]` Experience detail
- `/plan` Planner wizard
- `/itinerary/[id]` Itinerary summary

---

## MVP Acceptance Criteria
- Users can browse experiences and add to a plan
- Users can generate an itinerary and edit it
- Users can request confirmation via a **contact modal** (WhatsApp optional, not persistent)
