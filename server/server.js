const Koa = require('koa')
const _router = require('koa-router')
const serve = require('koa-static')
const convert = require('koa-convert')
const { readFileSync } = require('fs')
const { resolve } = require('path')

const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config.dev')

const paths = require('../config/paths')

const app = new Koa()
const router = _router()
const env = process.env.NODE_ENV || 'development'

router.get('/', renderHome)
router.get('/ko', renderHomeKo)
router.get('/jwallet', renderJwallet)

app.use(convert(router.routes()))
app.use(convert(router.allowedMethods()))

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (env === 'development') {
  const webpackDevMiddleware = require('./middleware/webpack-dev')
  const webpackHMRMiddleware = require('./middleware/webpack-hmr')

  const compiler = webpack(webpackConfig)

  // Enable webpack-dev and webpack-hot middleware
  app.use(webpackDevMiddleware(compiler, webpackConfig.output.publicPath))
  app.use(webpackHMRMiddleware(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(convert(serve(paths.appPublic)))
} else {
  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(convert(serve(paths.appBuild)))
}

function renderHome(ctx) {
  const homePath = resolve(__dirname, '..', 'build', 'index.html')
  ctx.body = readFileSync(homePath, 'utf8')
}

function renderHomeKo(ctx) {
  const homeKoPath = resolve(__dirname, '..', 'build', 'ko.html')
  ctx.body = readFileSync(homeKoPath, 'utf8')
}

function renderJwallet(ctx) {
  const jWalletPath = resolve(__dirname, '..', 'build', 'jwallet', 'index.html')
  ctx.body = readFileSync(jWalletPath, 'utf8')
}

module.exports = app
