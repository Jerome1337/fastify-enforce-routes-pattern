# @jerome1337/fastify-enforce-routes-pattern

[![codecov](https://codecov.io/github/Jerome1337/fastify-enforce-routes-pattern/graph/badge.svg?token=240RRVEUY1)](https://codecov.io/github/Jerome1337/fastify-enforce-routes-pattern)

A Fastify plugin that enforces naming pattern for route paths.

## Installation

```bash
npm install @jerome1337/fastify-enforce-routes-pattern
```

## Usage

```typescript
import fastify from 'fastify';
import enforceRoutesPattern from '@jerome1337/fastify-enforce-routes-pattern';

const app = fastify();

// Register with default options
app.register(enforceRoutesPattern);

// These routes will pass validation
app.get('/user-profile', () => {});
app.get('/user-profile/:id/payment-history', () => {});
app.post('/api/v1/create-user', () => {});

// These routes will throw an error
app.get('/userProfile', () => {}); // ❌ camelCase not allowed
app.get('/UserProfile', () => {}); // ❌ PascalCase not allowed
app.get('/user-profile', () => {}); // ❌ kebab-case not allowed
```

## Options

```typescript
type EnforceRoutesPatternOptions = {
  pattern?: string; // default: 'kebab-case'
  // Whether to throw an error on invalid routes or just log a warning to enforce
  strict?: boolean; // default: true
  // Custom patterns to ignore (e.g., health checks, metrics endpoints)
  ignoredPatterns?: string[]; // default: []
};
```

### Example with options

```typescript
app.register(enforceRoutesPattern, {
  pattern: 'snake_case', // Will enforce snake_case route names pattern
  strict: false, // Will only log warnings instead of throwing errors
  ignoredPatterns: [
    '^/health$', // Ignore health check endpoint
    '^/metrics', // Ignore metrics endpoints
  ],
});
```

## Contributing

Pull requests are welcome!
Please make sure to update tests as appropriate.

## License

MIT
