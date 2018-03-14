// @flow

import { connect } from 'react-redux'

import getActiveDigitalAssetsData from 'utils/getActiveDigitalAssetsData'
import { setCurrent } from 'routes/DigitalAssets/modules/digitalAssets'

import ActiveAssetsPanel from './ActiveAssetsPanel'

const mapStateToProps = ({ digitalAssets }: State): {
  currentAddress: ?Address,
  digitalAssets: Array<Object>,
} => ({
  currentAddress: digitalAssets.currentAddress,
  digitalAssets: getActiveDigitalAssetsData(digitalAssets),
})

const mapDispatchToProps = {
  setCurrent,
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAssetsPanel)
