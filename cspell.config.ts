import type {CSpellSettings} from 'cspell';

const GLOBALLY_IGNORED_WORDS = {
  names: [],
  misc: ['knipignore'],
  englishIshWords: [],
} satisfies Record<string, string[]>;

export default {
  useGitignore: true,
  enableGlobDot: true,
  ignorePaths: ['**/.gitignore', '**/.git/**', '**/pnpm-lock.yaml'],
  dictionaries: ['npm', 'node', 'typescript', 'fullstack'],
  overrides: [
    {
      filename: ['package.json', 'cspell.config.*s'],
      words: ['andreww'],
    },
  ],
  words: Object.values(GLOBALLY_IGNORED_WORDS).flat(),
} satisfies CSpellSettings;
