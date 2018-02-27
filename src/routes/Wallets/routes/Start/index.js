// import { injectReducer } from 'store/reducers'

export default () => ({
  path: 'start',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Start = require('./containers/StartContainer').default
      cb(null, Start)
    }, 'start')
  },
})
