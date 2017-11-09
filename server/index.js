const _debug = require('debug')
const server = require('./server')

const debug = _debug('app:bin:server')
const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'

server.listen(port)
debug(`Server is now running at http://${host}:${port}.`)
