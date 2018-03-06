import AsideLayout from 'layouts/AsideLayout'

// import ConvertFunds from './routes/ConvertFunds'
import ReceiveFunds from './routes/ReceiveFunds'
import SendFunds from './routes/SendFunds'

export default store => ({
  path: 'funds',
  component: AsideLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/') },
  childRoutes: [
    // ConvertFunds(store),
    ReceiveFunds(store),
    SendFunds(store),
  ],
})
