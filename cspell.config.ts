import type {CSpellSettings} from 'cspell';

const GLOBALLY_IGNORED_WORDS = {
  names: [],
  misc: ['knipignore'],
  englishIshWords: [],
} satisfies Record<string, string[]>;

export default {
  dictionaries: ['npm'],
  useGitignore: true,
  enableGlobDot: true,
  ignorePaths: ['pnpm-lock.yaml', '**/.gitignore', '**/.git/**'],
  overrides: [
    {
      filename: ['package.json', 'cspell.config.*s'],
      words: ['andreww'],
    },
  ],
  words: Object.values(GLOBALLY_IGNORED_WORDS).flat(),
} satisfies CSpellSettings;
