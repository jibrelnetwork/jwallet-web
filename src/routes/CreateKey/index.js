import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'create-key',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const CreateKey = require('./containers/CreateKeyContainer').default

      cb(null, CreateKey)
    }, 'create-key')
  },
})
