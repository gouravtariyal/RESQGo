# theme

RESQGo design system tokens (no UI components).

| File | Purpose |
|------|---------|
| `colors.ts` | Brand + semantic color palette |
| `spacing.ts` | 4pt spacing scale |
| `typography.ts` | Type scale, weights, variants |
| `radius.ts` | Border-radius scale |
| `shadows.ts` | Cross-platform elevation styles |
| `index.ts` | Barrel export + aggregated `theme` object |

Import from `@/` path or relative path:

```ts
import { theme, colors, spacing } from '../theme';
```

Shared `components/` should consume these tokens only — do not hardcode brand values.
