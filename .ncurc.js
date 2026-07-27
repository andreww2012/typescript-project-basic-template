// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import semver from 'semver';
import packageJson from './package.json' with {type: 'json'};

const CACHE_DIRECTORY = path.join(import.meta.dirname, 'node_modules/.cache/npm-check-updates');
fs.mkdirSync(CACHE_DIRECTORY, {recursive: true});

/** @type {Set<string>} */
const IGNORED_PACKAGES = new Set();

/** @type {Set<string>} */
const PACKAGES_WITH_PINNED_MAJOR_VERSION = new Set(['@types/node']);

/**
 * @type {Record<string, {packages: string[]; groupName?: string; icon?: string; priority?: number | null}>}
 */
const PACKAGE_GROUPS = Object.entries({
  'Package manager': {
    packages: ['pnpm'],
    icon: '📦',
    priority: 0,
  },
  '@eslint': {
    packages: ['eslint', 'eslint-config-un'],
    groupName: 'ESLint',
  },
  '@cspell': {
    packages: ['cspell'],
  },
  // '@commitlint': {packages: []},
}).reduce((result, [groupName, {packages: packagesInGroup, ...groupMeta}]) => {
  const isScopedGroup = groupName.startsWith('@');
  const groupInfo = {
    groupName: isScopedGroup ? groupName.slice(1) : groupName,
    ...groupMeta,
  };

  const packagesInCurrentGroup = Object.fromEntries([
    [isScopedGroup ? `${groupName}/*` : groupName, groupInfo],
    ...packagesInGroup.map((packageInGroup) => [packageInGroup, groupInfo]),
  ]);

  return Object.assign(result, packagesInCurrentGroup);
}, {});

/**
 * @type {import('npm-check-updates').RunOptions}
 */
export default {
  cache: true,
  cacheExpiration: 30,
  cacheFile: path.join(CACHE_DIRECTORY, 'cache.json'),

  target: (packageName) =>
    PACKAGES_WITH_PINNED_MAJOR_VERSION.has(packageName) ? 'minor' : 'latest',
  filterResults: (
    packageName,
    {currentVersion: currentVersionRaw, upgradedVersion: upgradedVersionRaw},
  ) => {
    // cspell:disable-next-line
    // eslint-disable-next-line sonarjs/no-empty-collection
    if (IGNORED_PACKAGES.has(packageName)) {
      return false;
    }

    const [currentVersion, upgradedVersion] = [currentVersionRaw, upgradedVersionRaw].map((v) =>
      v.split('@').at(-1),
    );
    const [currentVersionSemver, upgradedVersionSemver] = [currentVersion, upgradedVersion].map(
      (v) => semver.parse(v),
    );
    return !(
      PACKAGES_WITH_PINNED_MAJOR_VERSION.has(packageName) &&
      currentVersionSemver?.major !== upgradedVersionSemver?.major
    );
  },

  format: ['group'],
  interactive: true,
  groupFunction: (fullName) => {
    const [nameScope] = fullName.split('/');
    const knownGroup = PACKAGE_GROUPS[fullName] || PACKAGE_GROUPS[`${nameScope}/*`];

    if (knownGroup) {
      const {groupName, icon, priority} = knownGroup;
      return `${priority === null ? '' : `${priority ?? 3}. `}${icon || '📁'} ${groupName}`;
    }

    return fullName in packageJson.devDependencies
      ? '2. 🧑‍💻 Dev dependencies'
      : '1. 📦 Direct dependencies';
  },
};
