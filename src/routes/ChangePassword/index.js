import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'change-password',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ChangePassword = require('./containers/ChangePasswordContainer').default

      cb(null, ChangePassword)
    }, 'change-password')
  },
})
