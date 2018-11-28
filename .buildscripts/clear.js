const fs = require('fs-extra')
const path = require('path')

console.log(`Clear: emptying "${path.resolve('../build')}"...`)

try {
  fs.emptyDirSync(
    path.resolve('build')
  )
}
catch (err) {
  console.error('Clear: error')
  console.error(err)
}
finally {
  console.log('Clear: done')
}
