// @flow

import { assoc } from 'ramda'
import { connect } from 'react-redux'

import keystore from 'services/keystore'
import getCurrentLanguageCode from 'utils/i18n/getCurrentLanguageCode'
import { setLanguage } from 'routes/modules/i18n'
import { setCurrentNetwork as setNetwork } from 'routes/modules/networks'

import Menu from './Menu'

const getNetworkTitleIdMap = (
  res: NetworkTitleById,
  { id, title, isCustom }: Network,
): NetworkTitleById => {
  const i18nTitle = isCustom ? title : i18n(`networks.default.${title}`)
  return assoc(id, i18nTitle)(res)
}

const checkWalletReadOnly = (id: ?WalletId): boolean => {
  if (!id) {
    return false
  }

  try {
    const wallet: Wallet = keystore.getWallet(id)

    return wallet.isReadOnly
  } catch (err) {
    return false
  }
}

const mapStateToProps = ({ networks, wallets }: State): {
  networks: NetworkTitleById,
  currentNetwork: ?NetworkId,
  currentLanguage: LanguageCode,
} => ({
  currentNetwork: networks.currentNetwork,
  currentLanguage: getCurrentLanguageCode(),
  networks: networks.items.reduce(getNetworkTitleIdMap, {}),
  isWalletReadOnly: checkWalletReadOnly(wallets.activeWalletId),
})

const mapDispatchToProps = { setLanguage, setNetwork }

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
