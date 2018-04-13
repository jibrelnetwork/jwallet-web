// @flow

import * as sendFunds from '../routes/Send/sagas/sendFunds'
import * as receiveFunds from '../routes/Receive/sagas/receiveFunds'

export default {
  ...sendFunds,
  ...receiveFunds,
}
