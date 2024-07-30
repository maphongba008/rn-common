const fs = require('fs')
const { exec } = require('child_process')
const { getNpmVersion, isVersionGreater } = require('./utils')

const publishPackage = (pkg) => {
  return new Promise((resolve, reject) => {
    exec(
      `cd packages/${pkg} && npm publish --access public`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          return reject(error)
        }
        console.log(`stdout: ${stdout}`)
        resolve()
      },
    )
  })
}

const main = async () => {
  const packages = fs
    .readdirSync('./packages')
    .filter((t) => fs.statSync(`./packages/${t}`).isDirectory())

  for (const pkg of packages) {
    // check the latest version on npm
    const latestVersion = require(`../packages/${pkg}/package.json`).version
    console.log('checking ', pkg)
    const npmVersion = await getNpmVersion(pkg)
    console.log('local version', latestVersion, 'npm version', npmVersion)
    if (isVersionGreater(latestVersion, npmVersion)) {
      console.log(
        `@rn-common/${pkg} has a new version ${latestVersion}`,
        'publishing...',
      )
      await publishPackage(pkg)
    } else {
      console.log('skip')
    }
    console.log('=========================')
  }
}

main()
