const WebpackDevMiddleware = require('webpack-dev-middleware')
const _debug = require('debug')

const applyExpressMiddleware = require('../lib/apply-express-middleware')
const paths = require('../../config/paths')

const debug = _debug('app:server:webpack-dev')

module.exports = function(compiler, publicPath) {
  debug('Enable webpack dev middleware.')

  const middleware = WebpackDevMiddleware(compiler, {
    publicPath,
    contentBase: paths.appSrc,
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true,
    },
  })

  return async function koaWebpackDevMiddleware(ctx, next) {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end: content => (ctx.body = content),
      setHeader: function() {
        ctx.set.apply(ctx, arguments)
      },
    })

    if (hasNext) {
      await next()
    }
  }
}
