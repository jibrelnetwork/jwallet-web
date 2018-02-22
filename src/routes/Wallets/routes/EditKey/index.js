import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'edit/:keyId',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const EditKey = require('./containers/EditKeyContainer').default
      const editKey = require('./modules/editKey').default
      injectReducer(store, { key: 'editKey', reducer: editKey })
      cb(null, EditKey)
    }, 'edit')
  },
})
