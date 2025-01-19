export default {
  '**/*.{ts,mjs}': 'eslint --fix',
  'src/*.ts': 'tsc --noEmit',
};
