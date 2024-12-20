const fs = require('fs')

const root = `${__dirname}/..`
const sharedPackageVersion = '52.0.0'
const srcPackages = `${root}/packages`

const sharedPeerDeps = ['react-native', 'expo']

const packages = fs.readdirSync(srcPackages)
const expoDepsPath = `${root}/node_modules/expo/bundledNativeModules.json`
const expoSharedDeps = JSON.parse(fs.readFileSync(expoDepsPath, 'utf8'))

for (const pkg of packages) {
  const jsonPath = `${srcPackages}/${pkg}/package.json`
  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  json.version = sharedPackageVersion

  if (json.peerDependencies) {
    json.peerDependencies = {
      ...json.peerDependencies,
      ...sharedPeerDeps,
    }
  } else {
    json.peerDependencies = sharedPeerDeps
  }
  fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2))
}
