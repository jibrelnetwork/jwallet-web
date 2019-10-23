// @flow strict

import { pageView } from './pageView'
import { analyticsMiddleware } from './analyticsMiddleware'

export default [
  pageView,
  analyticsMiddleware,
]
