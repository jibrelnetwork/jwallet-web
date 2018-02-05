import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'create-key',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const CreateKey = require('./containers/CreateKeyContainer').default
      const createKey = require('./modules/createKey').default
      injectReducer(store, { key: 'createKey', reducer: createKey })
      cb(null, CreateKey)
    }, 'create-key')
  },
})
