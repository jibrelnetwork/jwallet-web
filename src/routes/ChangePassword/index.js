import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'change-password',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ChangePassword = require('./containers/ChangePasswordContainer').default
      const changePassword = require('./modules/changePassword').default
      injectReducer(store, { key: 'changePassword', reducer: changePassword })
      cb(null, ChangePassword)
    }, 'change-password')
  },
})
