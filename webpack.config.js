const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const zopfli = require('@gfx/zopfli')

const eslintFormatter = require('react-dev-utils/eslintFormatter')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

const PATHS = {
  INDEX_HTML: path.resolve('src/public/index.html'),
  INDEX_JS: path.resolve('src/main.js'),
  PACKAGE: path.resolve('package.json'),
  SOURCE: path.resolve('src'),
  OUTPUT: path.resolve('build'),
  PUBLIC: path.resolve('src/public'),
}

const isEnvDevelopment = process.env.NODE_ENV === 'development'
const isEnvProduction = process.env.NODE_ENV === 'production'

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = '/'

// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './'

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1)

// replace globalObject when we are in development so HMR and web workers would work together
// for details see:
// https://github.com/webpack/webpack/issues/6642 (closed in favor of 6525)
// https://github.com/webpack/webpack/issues/6525
const globalObject = isEnvDevelopment ? 'this' : undefined

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
  bail: true,
  devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',
  entry: [
    // require.resolve('./config/polyfills'),
    isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'),
    PATHS.INDEX_JS,
  ].filter(Boolean),

  output: {
    path: PATHS.OUTPUT,
    pathinfo: isEnvDevelopment,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath,
    globalObject,
    devtoolModuleFilenameTemplate: isEnvDevelopment
      ? info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
      : info =>
        path
          .relative(PATHS.SOURCE, info.absoluteResourcePath)
          .replace(/\\/g, '/'),
  },

  resolve: {
    modules: [
      PATHS.SOURCE,
      'node_modules',
      path.resolve('assets/mainnet/assets.json'),
      path.resolve('assets/ropsten/assets.json'),
    ],
    extensions: ['.js', '.jsx', '.json'],
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(
        PATHS.SOURCE,
        [
          'package.json',
          path.resolve('assets/mainnet/assets.json'),
          path.resolve('assets/ropsten/assets.json'),
        ]
      ),
    ],
  },

  module: {
    strictExportPresence: true,

    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },

      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      isEnvProduction && {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: PATHS.SOURCE,
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, 'src/public/assets/icons/sprite-pack'),
          path.resolve(__dirname, 'src/public/assets/tokens'),
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: '[hash:8].sprite.svg',
              publicPath: '/static/media/',
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { removeDoctype: true },
                { removeComments: true },
                { collapseGroups: true },
                { convertPathData: true },
                { removeDimensions: true },
                { convertTransform: true },
                { removeUselessDefs: true },
                { removeUselessStrokeAndFill: true },
                { removeNonInheritableGroupAttrs: true },
                { removeStyleElement: true },
                { removeAttrs: { attrs: '(fill|stroke)' } },
              ],
            },
          },
        ],
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works just like "file" loader but it also embeds
          // assets smaller than specified size as data URLs to avoid requests.
          {
            test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },

          // SCSS modules loader
          {
            test: /\.m\.scss$/,
            include: PATHS.SOURCE,
            use: [
              isEnvDevelopment && require.resolve('style-loader'),
              isEnvProduction && {
                loader: MiniCssExtractPlugin.loader,
                options: Object.assign(
                  {},
                  shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
                ),
              },
              {
                loader: require.resolve('css-loader'),
                options: {
                  url: false,
                  import: false,
                  modules: 'local',
                  localIdentName: isEnvDevelopment ?
                    '[path][name]__[local]--[hash:base64:5]' :
                    '[hash:base64:8]',
                  camelCase: true,
                  importLoaders: 2,
                  sourceMap: isEnvProduction,
                },
              },
              {
                // Options for PostCSS as we reference these options twice
                // Adds vendor prefixing based on your specified browser support in
                // package.json
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebook/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('autoprefixer')({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 11',
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                  sourceMap: isEnvProduction,
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: isEnvProduction,
                  includePaths: [
                    PATHS.SOURCE,
                  ],
                },
              },
            ].filter(Boolean),
          },

          // SCSS loader
          {
            test: /\.scss$/,
            include: PATHS.SOURCE,
            use: [
              isEnvDevelopment && require.resolve('style-loader'),
              isEnvProduction && {
                loader: MiniCssExtractPlugin.loader,
                options: Object.assign(
                  {},
                  shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
                ),
              },
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 2,
                  sourceMap: isEnvProduction,
                },
              },
              {
                // Options for PostCSS as we reference these options twice
                // Adds vendor prefixing based on your specified browser support in
                // package.json
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebook/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('autoprefixer')({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 11',
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                  sourceMap: isEnvProduction,
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: isEnvProduction,
                  includePaths: [
                    PATHS.SOURCE,
                  ],
                },
              },
            ].filter(Boolean),
          },

          // Worker loader
          {
            test: /worker\.js$/,
            use: [
              require.resolve('worker-loader'),
              require.resolve('babel-loader'),
            ],
          },

          // Process JS with Babel.
          {
            test: /\.(js|jsx)$/,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              cacheDirectory: true,
              cacheCompression: isEnvProduction,
              compact: isEnvProduction,
            },
          },

          // "file" loader makes sure assets end up in the `build` folder.
          // When you `import` an asset, you get its filename.
          // This loader don't uses a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/,
                      path.resolve(__dirname, 'src/public/assets/icons/sprite-pack'),
                      path.resolve(__dirname, 'src/public/assets/tokens'),
            ],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ].filter(Boolean),
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: PATHS.INDEX_HTML,
    }),

    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      NODE_ENV: process.env.NODE_ENV,
      PUBLIC_URL: publicUrl,
      GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    }),

    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BUILD_NUMBER': process.env.BUILD_NUMBER || 'dev',
      '__DEV__': isEnvDevelopment,
      '__PROD__': isEnvProduction,
      '__DEFAULT_TICKER_API__': JSON.stringify(process.env.DEFAULT_TICKER_API),
      '__DEFAULT_BLOCKEXPLORER_API__': JSON.stringify(process.env.DEFAULT_BLOCKEXPLORER_API),
    }),

    // This gives some necessary context to module not found errors, such as
    // the requesting resource.
    new ModuleNotFoundPlugin(path.resolve('.')),

    // This is necessary to emit hot updates (currently CSS only):
    isEnvDevelopment &&
    new webpack.HotModuleReplacementPlugin(),

    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebook/create-react-app/issues/240
    isEnvDevelopment &&
    new CaseSensitivePathsPlugin(),

    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebook/create-react-app/issues/186
    isEnvDevelopment &&
    new WatchMissingNodeModulesPlugin(
      path.resolve('node_modules')
    ),

    isEnvProduction &&
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),

    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath,
    }),

    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    isEnvProduction &&
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      importWorkboxFrom: 'cdn',
      navigateFallback: `${publicUrl}/index.html`,
      navigateFallbackBlacklist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp('^/_'),
        // Exclude URLs containing a dot, as they're likely a resource in
        // public/ and not a SPA route
        new RegExp('/[^/]+\\.[^/]+$'),
      ],
    }),

    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // we show bundle size report for production builds only
    // because development builds can differ significantly
    isEnvProduction &&
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../reports/bundle-size/index.html',
      openAnalyzer: false,
    }),

    // we pack files more than 8kb with gzip in advance
    // to prevent nginx from converting it in run-time
    isEnvProduction &&
    new CompressionPlugin({
      threshold: 8192,
      exclude: /\.map$/,
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback)
      },
    }),

    new CopyWebpackPlugin([
      {
        from: 'src/public/**/*',
        to: PATHS.OUTPUT,
        ignore: ['index.html'],
        transformPath: targetPath => targetPath.replace(/src\/public/, ''),
      },
    ]),

    new SpriteLoaderPlugin(),
  ].filter(Boolean),

  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: isEnvProduction,
        terserOptions: {
          keep_classnames: /^BigNumber/,
          keep_fnames: /^BigNumber/,
        },
      }),
    ],
  },

  devServer: {
    // Enable gzip compression of generated files.
    compress: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    // By default WebpackDevServer serves physical files from current directory
    // in addition to all the virtual build products that it serves from memory.
    // This is confusing because those files won’t automatically be available in
    // production build folder unless we copy them. However, copying the whole
    // project directory is dangerous because we may expose sensitive files.
    // Instead, we establish a convention that only files in `public` directory
    // get served. Our build script will copy `public` into the `build` folder.
    // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
    // Note that we only recommend to use `public` folder as an escape hatch
    // for files like `favicon.ico`, `manifest.json`, and libraries that are
    // for some reason broken when imported through Webpack. If you just want to
    // use an image, put it in `src` and `import` it from JavaScript instead.
    contentBase: PATHS.PUBLIC,
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: '/',
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebook/create-react-app/issues/293
    // src/node_modules is not ignored to support absolute imports
    // https://github.com/facebook/create-react-app/issues/1065
    watchOptions: {
      ignored: require('react-dev-utils/ignoredFiles')(PATHS.SOURCE),
    },
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    host: '0.0.0.0',
    port: process.env.WEBPACK_DEV_SERVER_PORT || 3000,
    overlay: false,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      disableDotRule: true,
    },
    before(app, server) {
      // This lets us fetch source contents from webpack for the error overlay
      app.use(
        require('react-dev-utils/evalSourceMapMiddleware')(server)
      )
      // This lets us open files from the runtime error overlay.
      app.use(
        require('react-dev-utils/errorOverlayMiddleware')()
      )

      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
      app.use(
        require('react-dev-utils/noopServiceWorkerMiddleware')()
      )
    },
  },

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
}
