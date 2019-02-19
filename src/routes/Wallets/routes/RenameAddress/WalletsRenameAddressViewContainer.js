// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  openView,
  closeView,
  renameAddress,
  changeNameInput,
} from '../../../../store/modules/walletsRenameAddress'

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
  goToWalletsAddresses: () => push('/wallets/addresses'),
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
