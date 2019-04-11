// @flow

import { connect } from 'react-redux'
import { actions } from 'redux-router5'

import {
  openView,
  closeView,
  renameAddress,
  changeNameInput,
} from 'store/modules/walletsRenameAddress'

import WalletsRenameAddressView from './WalletsRenameAddressView'

type StateProps = {|
  +invalidFields: FormFields,
  +name: string,
|}

function mapStateToProps({ walletsRenameAddress }: AppState): StateProps {
  const {
    name,
    invalidFields,
  } = walletsRenameAddress

  return {
    name,
    invalidFields,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  renameAddress,
  changeNameInput,
  goToWalletsAddresses: () => actions.navigateTo('WalletsAddresses'),
}

/* ::
type OwnProps = {|
  +params: {|
    +address: string,
  |},
|}
*/

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(WalletsRenameAddressView)
