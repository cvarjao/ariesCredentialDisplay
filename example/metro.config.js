/**
 * Metro Bundler configuration
 * https://facebook.github.io/metro/docs/en/configuration
 *
 * eslint-env node, es6
 */

const exclusionList = require('metro-config/src/defaults/exclusionList');
const getWorkspaces = require('get-yarn-workspaces');
const path = require('path');
const escape = require('escape-string-regexp')

function getConfig(appDir, options = {}) {
  const workspaces = getWorkspaces(appDir);

  console.log('appDir:', appDir);
  console.log('workspaces:', workspaces);
  // Add additional Yarn workspace package roots to the module map
  // https://bit.ly/2LHHTP0
  const watchFolders = [
    path.resolve(appDir, '..', 'node_modules'),
    ...workspaces.filter(workspaceDir => !(workspaceDir === appDir)),
  ];
  console.log('watchFolders:', watchFolders);
  const extraNodeModules = {
    // Resolve all react-native module imports to the locally-installed version
    'react-native': path.resolve(appDir, 'node_modules', 'react-native'),
    'react': path.resolve(appDir, 'node_modules', 'react'),

    // Resolve additional nohoist modules depended on by other packages
    'react-native-svg': path.resolve(
      appDir,
      'node_modules',
      'react-native-svg',
    ),

    // Resolve core-js imports to the locally installed version
    'core-js': path.resolve(appDir, 'node_modules', 'core-js'),
  };
  console.log('extraNodeModules:', extraNodeModules);
  return {
    watchFolders,
    resolver: {
      blockList: exclusionList([
        /^((?!example).)+[\/\\]node_modules[/\\]react-native[/\\].*/,
        /^((?!example).)+[\/\\]node_modules[/\\]react[/\\].*/,
      ]),
      extraNodeModules: extraNodeModules,
    },
  };
}

module.exports = getConfig(__dirname);
