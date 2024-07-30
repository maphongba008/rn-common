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

module.exports = {
  getNpmVersion,
  isVersionGreater,
}
