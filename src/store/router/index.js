// @flow

import browserPlugin from 'router5-plugin-browser'
import { router } from 'store/router/routes'

router.usePlugin(browserPlugin())

export { router }
