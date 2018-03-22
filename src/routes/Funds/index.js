// import ConvertFunds from './routes/ConvertFunds'
import ReceiveFunds from './routes/ReceiveFunds'
import SendFunds from './routes/SendFunds'

export default store => ({
  path: 'funds',
  indexRoute: { onEnter: (nextState, replace) => replace('/') },
  childRoutes: [
    // ConvertFunds(store),
    ReceiveFunds(store),
    SendFunds(store),
  ],
})
