const fs = require('fs-extra')
const path = require('path')

console.log(`Clear: emptying build directories...`)

try {
  fs.emptyDirSync(
    path.resolve('build')
  )
  fs.emptyDirSync(
    path.resolve('docs/storybook')
  )
}
catch (err) {
  console.error('Clear: error')
  console.error(err)
}
finally {
  console.log('Clear: done')
}
