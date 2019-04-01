// @flow

import React from 'react'
import { connect } from 'react-redux'
import { constants } from 'router5'

import {
  CoreLayout,
  MenuLayout,
  WalletsLayout,
} from 'layouts'

import { selectWalletsItems } from 'store/selectors/wallets'

import { checkAgreements } from 'utils/agreements'
import { CONDITIONS_LIST } from 'data/agreements'

import NotFound from 'routes/NotFound/NotFoundView'
import { Introduction } from 'routes/Introduction/Introduction'
import Agreements from 'routes/Agreements/AgreementsViewContainer'
import DigitalAssetsGrid from 'routes/DigitalAssets/routes/Grid/DigitalAssetsGridViewContainer'
import ManageAssets
  from 'routes/DigitalAssets/routes/Manage/DigitalAssetsManageViewContainer'
import AddAsset from 'routes/DigitalAssets/routes/AddAsset/AddAssetContainer'
import EditAsset from 'routes/DigitalAssets/routes/EditAsset/EditAssetContainer'
import ReceiveAsset
  from 'routes/DigitalAssets/routes/Receive/DigitalAssetsReceiveViewContainer'
import SendAsset
  from 'routes/DigitalAssets/routes/Send/DigitalAssetsSendViewContainer'
import Favorites
  from 'routes/Favorites/FavoritesIndexViewContainer'
import FavoritesAddress
  from 'routes/Favorites/routes/Address/FavoritesAddressViewContainer'
import Settings from 'routes/Settings/SettingsIndexViewContainer'
import SettingsCurrency from 'routes/Settings/routes/Currency/CurrencyContainer'
import SettingsPassword from 'routes/Settings/routes/PaymentPassword/PaymentPasswordContainer'
import Transactions from 'routes/Transactions/TransactionsIndexViewContainer'
import AssetTransactions from 'routes/Transactions/routes/Asset/TransactionsAssetViewContainer'
import Upgrade from 'routes/Upgrade/UpgradeViewContainer'
import Wallets from 'routes/Wallets/WalletsIndexViewContainer'
import WalletsAddresses from 'routes/Wallets/routes/Addresses/WalletsAddressesViewContainer'
import WalletsStart from 'routes/Wallets/routes/Start/WalletsStartViewContainer'
import WalletsBackup from 'routes/Wallets/routes/Backup/WalletsBackupViewContainer'
import WalletsCreate from 'routes/Wallets/routes/Create/WalletsCreateViewContainer'
import WalletsDelete from 'routes/Wallets/routes/Delete/WalletsDeleteViewContainer'
import WalletsImport from 'routes/Wallets/routes/Import/WalletsImportViewContainer'
import WalletsRename from 'routes/Wallets/routes/Rename/WalletsRenameViewContainer'
import WalletsRenameAddress
  from 'routes/Wallets/routes/RenameAddress/WalletsRenameAddressViewContainer'

type Props = {
  route: Object,
  isAllAgreementsChecked: boolean,
  hasNoWallets: boolean,
}

// FIXME: discuss with the team and update accordingly
const renderWithMenuLayout = (Component, props = {}) => (
  <CoreLayout>
    <MenuLayout>
      <Component {...props} />
    </MenuLayout>
  </CoreLayout>
)

// FIXME: discuss with the team and update accordingly
const renderWithWalletsLayout = (Component, props = {}) => (
  <CoreLayout>
    <WalletsLayout>
      <Component {...props} />
    </WalletsLayout>
  </CoreLayout>
)

export const AppRouter = ({
  route,
  isAllAgreementsChecked,
  hasNoWallets,
}: Props) => {
  // FIXME: Add proper flags handling
  if (!localStorage.getItem('introduced')) {
    return <Introduction />
  }

  if (!route || route.name === constants.UNKNOWN_ROUTE) {
    return renderWithWalletsLayout(NotFound)
  }

  if (!isAllAgreementsChecked) {
    return renderWithWalletsLayout(Agreements)
  }

  const {
    name,
    params,
  } = route

  switch (name) {
    case 'Wallet': {
      return renderWithMenuLayout(DigitalAssetsGrid)
    }
    case 'Wallet.ManageAssets': {
      return renderWithMenuLayout(ManageAssets)
    }
    case 'Wallet.AddAsset': {
      return renderWithMenuLayout(AddAsset)
    }
    case 'Wallet.EditAsset': {
      return renderWithMenuLayout(EditAsset, { params })
    }
    case 'Wallet.ReceiveAsset': {
      return renderWithMenuLayout(ReceiveAsset)
    }
    case 'Wallet.SendAsset': {
      return renderWithMenuLayout(SendAsset, { params })
    }
    case 'Wallet.Favorites': {
      return renderWithMenuLayout(Favorites)
    }
    case 'Wallet.FavoritesAddress': {
      return renderWithMenuLayout(FavoritesAddress, { params })
    }
    case 'Wallet.Settings': {
      return renderWithMenuLayout(Settings)
    }
    case 'Wallet.SettingsCurrency': {
      return renderWithMenuLayout(SettingsCurrency)
    }
    case 'Wallet.SettingsPassword': {
      return renderWithMenuLayout(SettingsPassword)
    }
    case 'Wallet.Transactions': {
      return renderWithMenuLayout(Transactions)
    }
    case 'Wallet.Transactions.Asset': {
      return renderWithMenuLayout(AssetTransactions, { params })
    }
    case 'Wallet.Upgrade': {
      return renderWithMenuLayout(Upgrade)
    }
    case 'Wallets': {
      if (hasNoWallets) {
        return renderWithWalletsLayout(WalletsStart)
      }

      return renderWithWalletsLayout(Wallets)
    }
    case 'WalletsAddresses': {
      return renderWithWalletsLayout(WalletsAddresses)
    }
    case 'WalletsBackup': {
      return renderWithWalletsLayout(WalletsBackup, { params })
    }
    case 'WalletsCreate': {
      return renderWithWalletsLayout(WalletsCreate)
    }
    case 'WalletsDelete': {
      return renderWithWalletsLayout(WalletsDelete, { params })
    }
    case 'WalletsImport': {
      return renderWithWalletsLayout(WalletsImport)
    }
    case 'WalletsRename': {
      return renderWithWalletsLayout(WalletsRename, { params })
    }
    case 'WalletsRenameAddress': {
      return renderWithWalletsLayout(WalletsRenameAddress, { params })
    }
    default: {
      return renderWithWalletsLayout(NotFound)
    }
  }
}

export default connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(
  (state) => {
    const isAllAgreementsChecked = checkAgreements(CONDITIONS_LIST)
    const hasNoWallets = selectWalletsItems(state).length === 0

    return {
      route: state.router.route,
      isAllAgreementsChecked,
      hasNoWallets,
    }
  },
)(AppRouter)
