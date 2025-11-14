/**
 * @type {import('cspell').CSpellSettings}
 */
export default {
  useGitignore: true,
  enableGlobDot: true,
  ignorePaths: ['**/pnpm-lock.yaml', '**/.gitignore', '**/.git/**', '**/.DS_Store'],
  words: [
    // Names
    'esbuild',
    'knip',
    'lefthook',
    'urns',

    // Misc
    'knipignore',

    // Actual-ish English words
    'dont',
  ],
  overrides: [
    {
      filename: ['package.json', 'cspell.config.*js'],
      words: ['andreww'],
    },
  ],
};
