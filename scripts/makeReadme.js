const fs = require('fs')

const dir = './packages'

const join = (...args) => args.join('/')

let headers = ['[This file is auto-generated, do not edit it manually]']
let readmeContent = ''
fs.readdirSync(dir).forEach((file) => {
  if (fs.statSync(join(dir, file)).isDirectory()) {
    const readmeFile = join(dir, file, 'README.md')
    if (!fs.existsSync(readmeFile)) {
      return
    }
    const content = fs.readFileSync(readmeFile, 'utf8')
    readmeContent += content + '\n'
    headers.push(
      `[@rn-common/${file}](https://github.com/maphongba008/rn-common#rn-common${file})`,
    )
  }
})

fs.writeFileSync('README.md', headers.join('\n\n') + '\n\n' + readmeContent)
