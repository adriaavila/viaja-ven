# Design System – Tailwind Theme + UI Kit

## Palette (locked)
- Primary Dark: `#7f00b2`
- Primary: `#8e22bb`
- Primary Soft: `#ab49cc`
- Accent Hot: `#ff0077`
- Accent Soft: `#ff3885`

Support (from byFood-inspired baseline)
- Text Main: `#475467`
- Text Muted: `#98A2B3`
- Surface: `#FAFAFA`
- Line: `#EAECF0`

---

## Tailwind Config

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#7f00b2',
          DEFAULT: '#8e22bb',
          soft: '#ab49cc',
        },
        accent: {
          hot: '#ff0077',
          soft: '#ff3885',
        },
        text: {
          main: '#475467',
          muted: '#98A2B3',
        },
        surface: '#FAFAFA',
        line: '#EAECF0',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '24px',
      },
    },
  },
}
```

---

## Usage Rules (important)
- **Accent Hot** (`#ff0077`) = primary CTA only (1 per screen when possible)
- **Primary** (`#8e22bb`) = brand elements, highlights, focus states
- **Primary Soft** (`#ab49cc`) = chips, subtle backgrounds, selected states
- Max **2 brand colors per screen** (primary + accent), use neutrals for structure

---

## Component Recipes

### Button (Primary)
```tsx
<button className="px-6 py-3 rounded-xl bg-accent-hot text-white font-medium hover:bg-accent-soft transition">
  Build my plan
</button>
```

### Button (Secondary)
```tsx
<button className="px-6 py-3 rounded-xl border border-primary-soft text-primary hover:bg-primary-soft/10 transition">
  Explore
</button>
```

### Card
```tsx
<div className="rounded-2xl border border-line bg-white overflow-hidden hover:shadow-lg transition">
  {children}
</div>
```

### Chip
```tsx
<span className="px-3 py-1 text-sm rounded-full bg-primary-soft/15 text-primary">
  Coffee
</span>
```

### Sticky Mobile CTA (generic)
```tsx
<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-line p-3 flex gap-3">
  <button className="flex-1 py-3 rounded-xl bg-accent-hot text-white">
    Continue
  </button>
</div>
```

---

## Motion Rules
- Card hover: `translateY(-2px)` + shadow
- Page transitions: `opacity + translateY(6px)` (200ms)
- Sticky CTA: slide-in after scroll threshold
