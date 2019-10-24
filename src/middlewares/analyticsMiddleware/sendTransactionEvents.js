import {
  DIMENSIONS,
  gaSendEvent,
} from 'utils/analytics'

import {
  STEPS,
  GO_TO_NEXT_STEP,
} from 'store/modules/digitalAssetsSend'

import {
  selectDigitalAsset,
  selectDigitalAssetsSend,
} from 'store/selectors/digitalAssets'

const TRANSACTION_EVENTS = {
  [STEPS.FORM]: 'TransactionParametersSet',
  [STEPS.CONFIRM]: 'TransactionConfirmed',
}

export const sendTransactionEvents = (state, action) => {
  switch (action.type) {
    case GO_TO_NEXT_STEP: {
      const digitalAssetsSend = selectDigitalAssetsSend(state)

      if (digitalAssetsSend.currentStep === 0) {
        gaSendEvent('SendAsset', TRANSACTION_EVENTS[digitalAssetsSend.currentStep])
      } else if (digitalAssetsSend.currentStep === 1) {
        const asset = selectDigitalAsset(state, digitalAssetsSend.formFieldValues.assetAddress)

        if (!asset) {
          break
        }

        gaSendEvent(
          'SendAsset',
          TRANSACTION_EVENTS[digitalAssetsSend.currentStep],
          {
            [DIMENSIONS.TRANSACTION_ASSET_SYMBOL]: asset.symbol,
            [DIMENSIONS.TRANSACTION_PRIORITY]: digitalAssetsSend.priority,
          },
        )
      }

      break
    }
    default: {
      // skip
    }
  }
}
