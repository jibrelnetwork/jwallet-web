// @flow strict

import { SET_WALLETS_ITEMS } from 'store/modules/wallets'
import { SET_FIAT_CURRENCY } from 'store/modules/settings'
import { selectWalletsItems } from 'store/selectors/wallets'
import { selectFavoritesItems } from 'store/selectors/favorites'
import { selectSettingsFiatCurrency } from 'store/selectors/settings'

import {
  METRICS,
  DIMENSIONS,
  gaSetUserMetric,
  gaSetUserDimension,
} from 'utils/analytics'

import {
  ADD_AUTO as FAVORITES_ADD_AUTO,
  ADD_BY_USER as FAVORITES_ADD_BY_USER,
  REMOVE as FAVORITES_REMOVE,
} from 'store/modules/favorites'

import {
  ADD_CUSTOM_ASSET,
  DELETE_CUSTOM_ASSET,
  SET_ASSET_IS_ACTIVE,
} from 'store/modules/digitalAssets'

import {
  selectActiveDigitalAssets,
  selectCustomDigitalAssets,
} from 'store/selectors/digitalAssets'

export const userParams = (state: AppState, action: Object) => {
  switch (action.type) {
    case SET_WALLETS_ITEMS: {
      const stats = selectWalletsItems(state).reduce((reduceResult, wallet) => {
        reduceResult.total += 1

        if (wallet.isReadOnly) {
          reduceResult.readonly += 1
        }

        if (wallet.type === 'mnemonic') {
          reduceResult.mnemonic += 1
        }

        return reduceResult
      }, {
        total: 0,
        readonly: 0,
        mnemonic: 0,
      })
      gaSetUserMetric(METRICS.WALLETS, stats.total)
      gaSetUserMetric(METRICS.WALLETS_READONLY, stats.readonly)
      gaSetUserMetric(METRICS.WALLETS_MNEMONIC, stats.mnemonic)

      if (stats.total === 1) {
        const today = new Date()

        gaSetUserDimension(
          DIMENSIONS.FIRST_WALLET_DATE,
          `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
        )
      }

      break
    }

    case ADD_CUSTOM_ASSET:
    case DELETE_CUSTOM_ASSET: {
      const quantity = selectCustomDigitalAssets(state).length
      gaSetUserMetric(METRICS.ASSETS_CUSTOM, quantity)

      break
    }

    case SET_ASSET_IS_ACTIVE: {
      const quantity = selectActiveDigitalAssets(state).length
      gaSetUserMetric(METRICS.ASSETS_ACTIVE, quantity)

      break
    }

    case SET_FIAT_CURRENCY: {
      gaSetUserDimension(DIMENSIONS.CURRENCY, selectSettingsFiatCurrency(state))

      break
    }

    case FAVORITES_ADD_AUTO:
    case FAVORITES_ADD_BY_USER:
    case FAVORITES_REMOVE: {
      gaSetUserMetric(METRICS.FAVORITES, selectFavoritesItems(state).length)

      break
    }

    default:
      break
  }
}
