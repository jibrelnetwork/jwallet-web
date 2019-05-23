// @flow

import { connect } from 'react-redux'
import { actions } from 'redux-router5'

import {
  openView,
  closeView,
  renameAddress,
  changeNameInput,
} from 'store/modules/walletsRenameAddress'

// eslint-disable-next-line import/no-duplicates
import WalletsRenameAddressView from './WalletsRenameAddressView'

// eslint-disable-next-line import/no-duplicates
import { type Props } from './WalletsRenameAddressView'

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

type OwnProps = {|
  +params: {|
    +address: string,
  |},
|}

export default (
  connect< Props, OwnProps, _, _, _, _ >(mapStateToProps, mapDispatchToProps)
)(WalletsRenameAddressView)
