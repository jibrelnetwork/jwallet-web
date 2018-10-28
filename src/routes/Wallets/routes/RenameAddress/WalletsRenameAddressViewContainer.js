// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  openView,
  closeView,
  renameAddress,
  changeNameInput,
} from './modules/walletsRenameAddress'

import WalletsRenameAddressView from './WalletsRenameAddressView'

type StateProps = {|
  +invalidFields: FormFields,
  +name: string,
|}

function mapStateToProps({ walletsRenameAddress }: State): StateProps {
  const { name, invalidFields } = walletsRenameAddress

  return { name, invalidFields }
}

const mapDispatchToProps = {
  openView,
  closeView,
  renameAddress,
  changeNameInput,
  goToWalletsAddresses: () => push('/wallets/addresses'),
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletsRenameAddressView)
