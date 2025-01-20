import type { RoutePattern } from './types';

const lowercase = /^[a-z0-9]+$/;

const PATTERNS: Record<RoutePattern, RegExp> = {
  'snake_case': /^[a-z0-9]+(_[a-z0-9]+)*$/,
  'camelCase': /^[a-z0-9]+([A-Z]{1}[a-z0-9]+)*$/,
  'kebab-case': /^[a-z0-9]+(-[a-z0-9]+)*$/,
  'PascalCase': /^([A-Z]{1}[a-z0-9]+)*$/,
};

const matchPattern = (path: string, pattern: RoutePattern): boolean => {
  const regex = PATTERNS[pattern];

  if (!regex) {
    throw new Error(`Unknown pattern: ${pattern}`);
  }

  return regex.test(path);
};

const validatePath = (
  path: string,
  pattern: RoutePattern,
  ignoredPatterns: string[],
): boolean => {
  if (
    ignoredPatterns.some((ignoredPattern) =>
      new RegExp(ignoredPattern).test(path),
    )
  ) {
    return true;
  }

  // Remove leading slash, split path segments, and filter out empty segments
  const segments = path.replace(/^\//, '').split('/').filter((segment) => segment);

  return segments.every((segment) => {
    // Allow dynamic parameters (e.g., :id)
    if (segment.startsWith(':')) {
      return true;
    }

    // Check if segment is lowercase (e.g., api, v1, etc.)
    // Consider that lowercase segment is always valid
    if (lowercase.test(segment)) {
      return true;
    }

    // Check if segment matches the specified pattern
    return matchPattern(segment, pattern);
  });
};

export { validatePath };
