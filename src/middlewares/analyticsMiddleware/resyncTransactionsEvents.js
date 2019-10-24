import { gaSendEvent } from 'utils/analytics'

import { REMOVE_ITEMS_BY_ASSET } from 'store/modules/transactions'

export const resyncTransactionsEvents = (state, action) => {
  switch (action.type) {
    case REMOVE_ITEMS_BY_ASSET: {
      gaSendEvent('StartResyncTransactions', action.payload.assetAddress)

      break
    }
    default: {
      // skip
    }
  }
}
