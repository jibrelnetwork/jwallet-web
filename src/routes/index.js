import CoreLayout from 'layouts/CoreLayout'
import JWalletRoute from './JWallet'

const createRoutes = store => ({
  path: '/jwallet',
  component: CoreLayout,
  indexRoute: JWalletRoute(store),
})

export default createRoutes
