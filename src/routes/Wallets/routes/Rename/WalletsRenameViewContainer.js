// @flow

import { connect } from 'react-redux'

import { changeNameInput } from '../../modules/wallets'

import {
  openView,
  closeView,
  renameRequest,
} from './modules/walletsRename'

import WalletsRenameView from './WalletsRenameView'

type StateProps = {|
  +items: Wallets,
  +invalidFields: FormFields,
  +name: string,
  +isLoading: boolean,
|}

function mapStateToProps({ wallets }: State): StateProps {
  const {
    items,
    invalidFields,
    name,
    isLoading,
  } = wallets

  return {
    items,
    invalidFields,
    name,
    isLoading,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  renameRequest,
  changeNameInput,
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletsRenameView)
