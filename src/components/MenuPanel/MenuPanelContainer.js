// @flow

import { connect } from 'react-redux'
import { withState } from 'recompose'
import { assoc, compose } from 'ramda'

import checkWalletReadOnly from 'utils/keystore/checkWalletReadOnly'
import getCurrentLanguageCode from 'utils/i18n/getCurrentLanguageCode'
import { setLanguage } from 'routes/modules/i18n'
import { setCurrentNetwork as setNetwork } from 'routes/modules/networks'

import MenuPanel from './MenuPanel'

const getNetworkTitleIdMap = (
  res: NetworkTitleById,
  { id, title, isCustom }: Network,
): NetworkTitleById => {
  const i18nTitle = isCustom ? title : i18n(`networks.default.${title}`)
  return assoc(id, i18nTitle)(res)
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('activeSelect', 'toggleSelect', null),
)(MenuPanel)
