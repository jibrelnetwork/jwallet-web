import { gaSendEvent } from 'utils/analytics'
import {
  ADD_CUSTOM_ASSET,
  DELETE_CUSTOM_ASSET,
  SET_ASSET_IS_ACTIVE,
} from 'routes/DigitalAssets/modules/digitalAssets'
import { selectCustomDigitalAssets, selectActiveDigitalAssets } from 'store/selectors/digitalAssets'

export const analyticsMiddleware = store => next => (action) => {
  next(action)
  const state = store.getState()

  switch (action.type) {
    case ADD_CUSTOM_ASSET: {
      gaSendEvent(
        'Custom Assets',
        'Total',
        'Add',
        selectCustomDigitalAssets(state).length
      )
      break
    }
    case DELETE_CUSTOM_ASSET: {
      gaSendEvent(
        'Custom Assets',
        'Total',
        'Remove',
        selectCustomDigitalAssets(state).length
      )
      break
    }
    case SET_ASSET_IS_ACTIVE: {
      gaSendEvent(
        'Active Assets',
        'Total',
        selectActiveDigitalAssets(state).length
      )
      break
    }
    default: {
      // do nothing
    }
  }
}
