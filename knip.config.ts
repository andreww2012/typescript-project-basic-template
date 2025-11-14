// cspell:ignore ncurc
import type {KnipConfig} from 'knip';

export default {
  entry: ['.ncurc.cjs'],
  tags: ['-knipignore'],
  treatConfigHintsAsErrors: true,
} satisfies KnipConfig;
