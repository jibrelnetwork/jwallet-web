const path = require('path')
const fs = require('fs')

const uploadDBSnapshotClientScript = fs.readFileSync(
  path.resolve(__dirname, 'uploadDBSnapshot.client.js'),
  'utf8'
)

module.exports = (snapshot) =>
  browser.executeAsyncScript(
    uploadDBSnapshotClientScript,
    [snapshot],
  )
