// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { changeNameInput } from 'store/modules/wallets'

import {
  rename,
  openView,
  closeView,
} from 'store/modules/walletsRename'

import WalletsRenameView from './WalletsRenameView'

type StateProps = {|
  +items: Wallets,
  +invalidFields: FormFields,
  +name: string,
  +isLoading: boolean,
|}

function mapStateToProps({ wallets }: AppState): StateProps {
  const {
    persist: {
      items,
    },
    name,
    isLoading,
    invalidFields,
  } = wallets

  return {
    name,
    items,
    isLoading,
    invalidFields,
  }
}

const mapDispatchToProps = {
  rename,
  openView,
  closeView,
  changeNameInput,
  goToWallets: () => push('/wallets'),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(WalletsRenameView)
