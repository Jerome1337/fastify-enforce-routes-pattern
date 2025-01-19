import { FastifyPluginCallback } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import type { EnforceRoutesPatternOptions } from './types';
import { validatePath } from './validator';
import { InvalidRoutesPatternError } from './error';

const defaultOptions: Required<EnforceRoutesPatternOptions> = {
  'pattern': 'kebab-case',
  'strict': true,
  'ignoredPatterns': [],
};

const enforceRoutesPattern: FastifyPluginCallback<EnforceRoutesPatternOptions> = (
  fastify,
  options,
  done,
) => {
  const config = { ...defaultOptions, ...options };

  const chosenPattern = config.pattern;
  const isStrict = config.strict;
  const ignoredPatterns = config.ignoredPatterns;

  fastify.addHook('onRoute', (routeOptions) => {
    const { url } = routeOptions;

    if (!validatePath(url, chosenPattern, ignoredPatterns)) {
      const message = `Route "${url}" is not in ${chosenPattern} format`;

      if (isStrict) {
        throw new InvalidRoutesPatternError(message);
      }

      fastify.log.warn(message);
    }
  });

  done();
};

export default fastifyPlugin(enforceRoutesPattern, {
  'fastify': '5.x',
  'name': '@jerome1337/fastify-enforce-routes-pattern',
});
