export default () => ({
  path: 'popular',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Popular = require('./containers/PopularContainer').default
      cb(null, Popular)
    }, 'popular')
  },
})
