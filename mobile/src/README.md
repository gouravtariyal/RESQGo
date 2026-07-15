# src

Application source root for RESQGo.

Organized with **Feature-based Architecture** and **Clean Architecture** principles:

- **features/** — domain modules (UI + feature-local logic)
- **components/** — shared, reusable UI building blocks
- **services/** — infrastructure adapters (API, Firebase, location, etc.)
- **store/** — global application state
- **navigation/** — app-wide navigation graph and navigators
- **theme /, types /, config /, constants /, hooks /, utils /** — cross-cutting shared layers
- **assets/** — static media (images, icons, fonts, animations)

Business logic lives in features and services — keep this root free of app entry wiring beyond structure.
