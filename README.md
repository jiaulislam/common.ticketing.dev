# common.ticketing.dev

This package provides shared TypeScript/JavaScript utilities, error classes, event definitions, and middlewares for the ticketing.dev microservices architecture. It is designed to be imported by other services (e.g., auth, client, etc.) to ensure consistent error handling, event contracts, and middleware logic across the system.

## Features
- **Error Classes**: Standardized error types for API and service error handling.
- **Event Definitions**: Common event contracts for inter-service communication.
- **Middlewares**: Reusable Express middlewares for authentication, validation, and error handling.

## Folder Structure
- `src/errors/` — Custom error classes (e.g., DatabaseError, NotFoundError, RequestValidationError)
- `src/events/` — Event contracts and types
- `src/middlewares/` — Express middlewares (e.g., current user, require auth, error handler)
- `src/index.ts` — Entry point for exports

## Usage
Install this package in your microservice:
```bash
npm install @jiaulislam.dev/common.ticketing.dev
```

Then, import the utilities you need in your service code:
```
Import and use shared utilities:
```typescript
import { DatabaseError, errorHandlerMiddleware } from 'common.ticketing.dev';
```

## Development
- Written in TypeScript for type safety
- Build with `tsc`
- Extend with new errors, events, or middlewares as needed

## License
MIT

