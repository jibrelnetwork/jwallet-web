// @flow

import { assoc } from 'ramda'
import { connect } from 'react-redux'

import { setCurrentNetwork as setNetwork } from 'routes/modules/networks'

import Menu from './Menu'

const getNetworkTitleIdMap = (
  res: NetworkTitleById,
  { id, title, isCustom }: Network,
): NetworkTitleById => {
  const i18nTitle = isCustom ? title : i18n(`networks.default.${title}`)
  return assoc(id, i18nTitle)(res)
}

const mapStateToProps = ({ networks }: State): {
  networks: NetworkTitleById,
  currentNetwork: ?NetworkId,
} => ({
  currentNetwork: networks.currentNetwork,
  networks: networks.items.reduce(getNetworkTitleIdMap, {}),
})

const mapDispatchToProps = {
  setNetwork,
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
