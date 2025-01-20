import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import Fastify from 'fastify';

import routesPattern from '../index';

describe('fastify-enforce-routes-pattern', async () => {
  let fastify: ReturnType<typeof Fastify>;

  beforeEach(() => {
    fastify = Fastify({
      'logger': {
        'level': 'warn',
        'transport': {
          'target': 'pino-pretty',
          'options': {
            'colorize': false,
            'minimumLevel': 'warn',
          },
        },
      },
    });
  });

  await describe('no specific pattern', async () => {
    it('allows valid routes without a specific pattern', async () => {
      await fastify.register(routesPattern);

      fastify.get('/', () => {});
      fastify.get('/user/', () => {});
      fastify.get('/user/profile', () => {});
      fastify.get('/user/profile3', () => {});

      await fastify.ready();

      assert.ok(true);
    });
  });

  await describe('snake_case pattern', async () => {
    it('allows valid snake_case routes', async () => {
      await fastify.register(routesPattern, { 'pattern': 'snake_case' });

      fastify.get('/user_profile', () => {});
      fastify.get('/user_profile/:id/payment_history', () => {});
      fastify.post('/api/v1/create_user', () => {});

      await fastify.ready();

      assert.ok(true);
    });

    it('throws error for invalid snake_case routes', async () => {
      await fastify.register(routesPattern, { 'pattern': 'snake_case' });

      assert.throws(() => fastify.get('/userProfile', () => {}), {
        'name': 'InvalidRouteFormatError',
      });
    });
  });

  await describe('camelCase pattern', async () => {
    it('allows valid camelCase routes', async () => {
      await fastify.register(routesPattern, { 'pattern': 'camelCase' });

      fastify.get('/userProfile', () => {});
      fastify.get('/userProfile/:id/historyOfPayments', () => {});
      fastify.post('/api/v1/createUser', () => {});

      await fastify.ready();

      assert.ok(true);
    });

    it('throws error for invalid camelCase routes', async () => {
      await fastify.register(routesPattern, { 'pattern': 'camelCase' });

      assert.throws(() => fastify.get('/api/v1/UserProfile', () => {}), {
        'name': 'InvalidRouteFormatError',
      });
      assert.throws(() => fastify.get('/user-profile', () => {}), {
        'name': 'InvalidRouteFormatError',
      });
      assert.throws(() => fastify.get('/user_profile', () => {}), {
        'name': 'InvalidRouteFormatError',
      });
    });
  });

  await describe('PascalCase pattern', async () => {
    it('allows valid PascalCase routes', async () => {
      await fastify.register(routesPattern, { 'pattern': 'PascalCase' });

      fastify.get('/UserProfile', () => {});
      fastify.get('/UserProfile/:id/HistoryOfPayments', () => {});
      fastify.post('/api/v1/CreateUser', () => {});

      await fastify.ready();

      assert.ok(true);
    });

    it('throws error for invalid PascalCase routes', async () => {
      await fastify.register(routesPattern, { 'pattern': 'PascalCase' });

      assert.throws(() => fastify.get('/api/v1/userProfile', () => {}), {
        'name': 'InvalidRouteFormatError',
      });
      assert.throws(() => fastify.get('/user-profile', () => {}), {
        'name': 'InvalidRouteFormatError',
      });
      assert.throws(() => fastify.get('/user_profile', () => {}), {
        'name': 'InvalidRouteFormatError',
      });
    });
  });

  await describe('kebab-case pattern', async () => {
    it('allows valid kebab-case routes', async () => {
      await fastify.register(routesPattern, { 'pattern': 'kebab-case' });

      fastify.get('/user-profile', () => {});
      fastify.get('/user-profile/:id/payment-history', () => {});
      fastify.post('/api/v1/create-user', () => {});

      await fastify.ready();

      assert.ok(true);
    });

    it('throws error for invalid kebab-case routes', async () => {
      await fastify.register(routesPattern, { 'pattern': 'kebab-case' });

      assert.throws(() => fastify.get('/userProfile', () => {}), {
        'name': 'InvalidRouteFormatError',
      });
      assert.throws(() => fastify.get('/UserProfile', () => {}), {
        'name': 'InvalidRouteFormatError',
      });
      assert.throws(() => fastify.get('/api/v1/user_profile', () => {}), {
        'name': 'InvalidRouteFormatError',
      });
    });
  });

  await describe('warning mode', async () => {
    it('logs warning instead of throwing in non-strict mode', async () => {
      await fastify.register(routesPattern, {
        'pattern': 'snake_case',
        'strict': false,
      });

      fastify.get('/userProfile', () => {});

      await fastify.ready();

      assert.ok(true);
    });
  });

  await describe('ignored patterns', async () => {
    it('respects ignored patterns', async () => {
      await fastify.register(routesPattern, {
        'pattern': 'snake_case',
        'ignoredPatterns': ['^/health$', '^/metrics'],
      });

      // These should not throw despite not matching the pattern
      fastify.get('/health', () => {});
      fastify.get('/metrics/serverStatus', () => {});

      await fastify.ready();

      assert.ok(true);
    });
  });

  await describe('unsupported patterns', async () => {
    it('throws error for unsupported patterns', async () => {
      await fastify.register(routesPattern, {
        'pattern': 'unsupported_pattern',
      });

      assert.throws(() => fastify.get('/user_profile', () => {}), {
        'name': 'Error',
      });

      await fastify.ready();

      assert.ok(true);
    });
  });
});
