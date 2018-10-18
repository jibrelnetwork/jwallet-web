// @flow

/**
 * Funds
 */
import * as receiveFunds from 'routes/Funds/routes/Receive/modules/receiveFunds'
import * as sendFunds from 'routes/Funds/routes/Send/modules/sendFunds'

/**
 * Digital Assets
 */
import * as digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'

export const setInvalidField = (store: { dispatch: Dispatch }) => (next: Next) => (action: FSA) => {
  const { type, payload }: FSA = action

  switch (type) {
    /**
     * Funds
     */
    case receiveFunds.GENERATE_ERROR: {
      store.dispatch(receiveFunds.setInvalidField(payload.fieldName, payload.message))
      break
    }

    case sendFunds.SEND_ERROR: {
      store.dispatch(sendFunds.setInvalidField(payload.fieldName, payload.message))
      break
    }

    /**
     * Digital Assets
     */
    case digitalAssets.SEARCH_ERROR: {
      store.dispatch(digitalAssets.setInvalidField(payload.fieldName, payload.message))
      break
    }

    default: break
  }

  return next(action)
}
