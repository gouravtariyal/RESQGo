# components

Shared, reusable UI components used across features.

Prefer **presentational** components: receive props, emit events, no direct API/store coupling.

| Folder | Purpose |
|--------|---------|
| `common/` | Generic primitives (Text, Spacer, Container, etc.) |
| `buttons/` | Button variants |
| `cards/` | Card layouts |
| `inputs/` | Form inputs and controls |
| `modals/` | Modal shells and dialogs |
| `loaders/` | Loading / skeleton indicators |
| `headers/` | Screen and section headers |

Feature-specific UI stays under `features/<feature>/components`.
