type RoutePattern = 'snake_case' | 'camelCase' | 'kebab-case' | 'PascalCase';

type EnforceRoutesPatternOptions = {
  /**
   * The naming pattern to enforce
   * @default 'kebab-case'
   */
  pattern?: RoutePattern;

  /**
   * Whether to throw an error on invalid routes or just log a warning to enforce
   * @default true
   */
  strict?: boolean;

  /**
   * Custom patterns to ignore (e.g., health checks, metrics endpoints)
   * @default []
   */
  ignoredPatterns?: string[];
};

export type { EnforceRoutesPatternOptions, RoutePattern };
