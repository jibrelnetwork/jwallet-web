export default () => ({
  path: 'with-balance',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const WithBalance = require('./containers/WithBalanceContainer').default
      cb(null, WithBalance)
    }, 'with-balance')
  },
})
