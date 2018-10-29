// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { changeNameInput } from '../../modules/wallets'

import {
  rename,
  openView,
  closeView,
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletsRenameView)
