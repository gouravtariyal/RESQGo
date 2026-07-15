# navigation

App-wide navigation graph for RESQGo.

Owns:
- Root / stack / tab / drawer navigators
- Route name and param type definitions (or re-exports from `types`)
- Linking / deep-link configuration wiring
- Auth-gated vs public navigator composition

Screens themselves live in `features/`; this folder only composes them into navigators.
