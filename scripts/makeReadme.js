const fs = require('fs')

const dir = './packages'

const join = (...args) => args.join('/')

let readmeContent = '[This file is auto-generated, do not edit it manually]\n\n'

fs.readdirSync(dir).forEach((file) => {
  if (fs.statSync(join(dir, file)).isDirectory()) {
    const readmeFile = join(dir, file, 'README.md')
    if (!fs.existsSync(readmeFile)) {
      return
    }
    const content = fs.readFileSync(readmeFile, 'utf8')
    readmeContent += content + '\n'
  }
})

fs.writeFileSync('README.md', readmeContent)
