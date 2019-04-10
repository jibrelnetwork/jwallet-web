// @flow

import { connect } from 'react-redux'
import { actions } from 'redux-router5'

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
  goToWallets: () => actions.navigateTo('Wallets'),
}

/* ::
type OwnProps = {|
  +params: {|
    +walletId: string,
  |},
|}
*/

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(WalletsRenameView)
