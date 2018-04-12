// import Convert from './routes/Convert'
import Receive from './routes/Receive'
import Send from './routes/Send'

export default store => ({
  path: 'funds',
  indexRoute: { onEnter: (nextState, replace) => replace('/') },
  childRoutes: [
    // Convert(store),
    Receive(store),
    Send(store),
  ],
})
