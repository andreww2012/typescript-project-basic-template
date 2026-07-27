import {eslintConfig} from 'eslint-config-un';

export default eslintConfig({
  // defaultConfigsStatus: 'misc-enabled',
  // typeInfoRules: {
  //   allowDefaultProject: ['*.config.*ts'],
  // },
  configs: {
    // noStylisticRules: true,
    // noStylisticRules: {
    //   enableRules: {
    //     rules: true,
    //     disableAllOtherRules: true,
    //   },
    // },
    // ts: {
    //   configDisableNoUnsafe: true,
    //   configNoTypeAssertion: true,
    //   overrides: {
    //     'ts/no-explicit-any': 0,
    //   },
    // },

    // False positives:
    // youDontNeedLodashUnderscore: false, // cspell:disable-line
    zod: false,
  },
  extraConfigs: [],
});
