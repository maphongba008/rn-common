const fs = require('fs')
const { getNpmVersion, isVersionGreater } = require('./utils')
const { hashElement } = require('folder-hash')
const path = require('path')
const metadataPath = './scripts/packageHashMetadata.json'
const basePath = './packages'

const getHash = async (pkg) => {
  const options = {
    folders: { exclude: ['.*', 'node_modules', 'test_coverage'] },
  }

  const res = await hashElement(path.join(basePath, pkg), options)
  return res.hash
}

const getMetadataJSON = () => {
  if (!fs.existsSync(metadataPath)) {
    return {}
  }
  const metadata = fs.readFileSync(metadataPath)
  return JSON.parse(metadata)
}

const getVersion = (pkg) => {
  return JSON.parse(fs.readFileSync(`${basePath}/${pkg}/package.json`, 'utf8'))
    .version
}

const increaseVersion = (pkg, type = 'patch') => {
  const version = getVersion(pkg)
  const [major, minor, patch] = String(version)
    .split('.')
    .map((e) => {
      return parseInt(e, 10)
    })
  if (type === 'minor') {
    return `${major}.${minor + 1}.0`
  }
  if (type === 'major') {
    return `${major + 1}.0.0`
  }
  return `${major}.${minor}.${patch + 1}`
}

const main = async () => {
  const metadata = getMetadataJSON()
  // console.log(metadata)
  const folders = fs
    .readdirSync(basePath)
    .filter((file) => fs.statSync(`${basePath}/${file}`).isDirectory())

  for (const folder of folders) {
    console.log(`=====Checking ${folder}`)
    const hash = await getHash(folder)
    if (!metadata[folder]) {
      metadata[folder] = {
        hash,
        version: getVersion(folder),
      }
    } else {
      const { hash: oldHash, version: oldVersion } = metadata[folder]
      if (oldHash !== hash && oldVersion === getVersion(folder)) {
        const npmVersion = await getNpmVersion(folder)
        if (isVersionGreater(oldVersion, npmVersion)) {
          continue
        }
        // TODO: check if the version is already greater than npm version
        const newVersion = increaseVersion(folder)
        console.log(
          `Hash of ${folder} has changed, increase version to`,
          newVersion,
        )
        fs.writeFileSync(
          `${basePath}/${folder}/package.json`,
          JSON.stringify(
            {
              ...JSON.parse(
                fs.readFileSync(`${basePath}/${folder}/package.json`, 'utf8'),
              ),
              version: newVersion,
            },
            null,
            2,
          ) + '\n',
        )
        metadata[folder] = {
          hash,
          version: newVersion,
        }
      } else if (oldHash !== hash && oldVersion !== getVersion(folder)) {
        console.log('Already increased')
      } else {
        console.log('Not changed')
      }
    }
  }
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2))
}

main()
