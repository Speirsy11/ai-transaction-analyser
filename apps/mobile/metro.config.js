const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch all files in the monorepo
config.watchFolders = [monorepoRoot];

// Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// Force resolving nested modules to the folders below
config.resolver.disableHierarchicalLookup = true;

// Enable unstable_enablePackageExports to support ESM packages with exports field
config.resolver.unstable_enablePackageExports = true;

// Force React and React DOM to be resolved from the mobile app's node_modules
// This is necessary because the monorepo uses React 19 while React Native requires React 18
config.resolver.extraNodeModules = {
  react: path.resolve(projectRoot, "node_modules/react"),
  "react-dom": path.resolve(projectRoot, "node_modules/react-dom"),
};

module.exports = config;
