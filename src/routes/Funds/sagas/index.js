import * as sendFunds from '../routes/SendFunds/sagas/sendFunds'
import * as receiveFunds from '../routes/ReceiveFunds/sagas/receiveFunds'

export default {
  ...sendFunds,
  ...receiveFunds,
}
