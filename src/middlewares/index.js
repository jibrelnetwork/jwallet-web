// @flow

import * as forms from './forms'
import * as router from './router'
import * as storage from './storage'
import * as analytics from './analytics'
import * as notification from './notification'

export default [
  storage.set,
  router.redirect,
  notification.show,
  analytics.pushEvent,
  forms.setInvalidField,
]
