import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'edit-key',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const EditKey = require('./containers/EditKeyContainer').default

      cb(null, EditKey)
    }, 'edit-key')
  },
})
