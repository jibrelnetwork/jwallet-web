import * as forms from './forms'
import * as router from './router'
import * as analytics from './analytics'
import * as notification from './notification'

export default [
  router.redirect,
  notification.show,
  analytics.pushEvent,
  forms.setInvalidField,
]
