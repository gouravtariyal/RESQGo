# services

Infrastructure and external integration layer (Clean Architecture adapters).

| Folder | Purpose |
|--------|---------|
| `api/` | HTTP client, endpoints, interceptors |
| `firebase/` | Firebase Auth, Firestore, FCM, etc. |
| `location/` | GPS / geolocation / geocoding |
| `notification/` | Push and local notification plumbing |
| `storage/` | Secure / async persistent storage |
| `ai/` | AI provider clients and streaming helpers |

Services should not depend on React components or feature screens. Features and hooks consume these services.
