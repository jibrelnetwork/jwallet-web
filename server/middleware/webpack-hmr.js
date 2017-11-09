const WebpackHotMiddleware = require('webpack-hot-middleware')
const _debug = require('debug')
const applyExpressMiddleware = require('../lib/apply-express-middleware')

const debug = _debug('app:server:webpack-hmr')

module.exports = function(compiler, opts) {
  debug('Enable Webpack Hot Module Replacement (HMR).')

  const middleware = WebpackHotMiddleware(compiler, opts)
  return async function koaWebpackHMR(ctx, next) {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res)

    if (hasNext && next) {
      await next()
    }
  }
}
