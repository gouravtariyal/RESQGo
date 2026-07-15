# features

Feature modules for RESQGo (Feature-based + Clean Architecture).

Each feature is a vertical slice and should typically include:

```
features/<name>/
├── screens/       # Screen containers
├── components/    # Feature-local UI
├── hooks/         # Feature-local hooks
├── services/      # Feature use-cases / API calls (optional)
├── types/         # Feature-local types
└── index.ts       # Public feature exports
```

**Rules:**
- Prefer depending inward on `services/`, `hooks/`, `theme/`, `types/`, and shared `components/`.
- Do not import from sibling features directly; share via shared layers or navigation params.
- Keep infrastructure (Firebase, HTTP, storage) in `src/services` and call it from feature services/hooks.
