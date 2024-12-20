const fs = require('fs')
const _ = require('lodash')

const root = `${__dirname}/..`
const sharedPackageVersion = '52.0.0'
const srcPackages = `${root}/packages`

const sharedPeerDeps = ['react-native', 'expo']
const fileToJSON = (path) => JSON.parse(fs.readFileSync(path, 'utf8'))

const packages = fs.readdirSync(srcPackages)
const expoBundledPath = `${root}/node_modules/expo/bundledNativeModules.json`
//
for (const pkg of packages) {
  const jsonPath = `${srcPackages}/${pkg}/package.json`
  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  json.version = sharedPackageVersion

  const bundledDepsMap = fileToJSON(expoBundledPath)
  const peers = json.peerDependencies ? Object.keys(json.peerDependencies) : []
  const sharedPeerDepsMap = _.merge(
    {},
    ...[...sharedPeerDeps, ...peers].map((dep) => {
      if (bundledDepsMap[dep]) {
        return { [dep]: bundledDepsMap[dep] }
      } else {
        const appMap = fileToJSON(`${root}/apps/sample/package.json`)
        if (appMap.dependencies[dep]) {
          return { [dep]: appMap.dependencies[dep] }
        }
        return {}
      }
    }),
  )

  if (json.peerDependencies) {
    json.peerDependencies = {
      ...json.peerDependencies,
      ...sharedPeerDepsMap,
    }
  } else {
    json.peerDependencies = sharedPeerDepsMap
  }
  fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2))
}
