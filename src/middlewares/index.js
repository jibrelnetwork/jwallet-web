import * as router from './router'
import * as analytics from './analytics'
import * as notification from './notification'

export default [
  analytics.send,
  router.redirect,
  notification.show,
]
