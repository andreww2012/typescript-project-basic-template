import {eslintConfig} from 'eslint-config-un';

export default eslintConfig({
  configs: {
    ts: {
      allowDefaultProject: ['*.config.*ts'],
    },
    packageJson: true,
    youDontNeedLodashUnderscore: false,
    zod: false,
  },
});
