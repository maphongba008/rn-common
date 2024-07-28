const fs = require('fs')
const { exec } = require('child_process')
const getNpmVersion = async (packageName) => {
  const request = require('request')

  const url = `https://registry.npmjs.org/@rn-common/${packageName}`
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (err, res, body) => {
      console.log('url', url)
      if (err) {
        return reject(err)
      }
      if (res.statusCode === 200) {
        const latestVersion = body['dist-tags'].latest
        resolve(latestVersion)
      } else {
        resolve('')
      }
    })
  })
}

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

const isVersionGreater = (v1, v2) => {
  if (!v2) {
    return true
  }
  const v1Parts = v1.split('.').map((t) => parseInt(t, 10))
  const v2Parts = v2.split('.').map((t) => parseInt(t, 10))

  for (let i = 0; i < v1Parts.length; i++) {
    if (v1Parts[i] > v2Parts[i]) {
      return true
    } else if (v1Parts[i] < v2Parts[i]) {
      return false
    }
  }
  return false
}

main()
