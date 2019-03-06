// @flow

import { connect } from 'react-redux'

import { selectActiveWalletId } from 'store/selectors/wallets'

import {
  requestPrivateKey,
} from 'store/modules/digitalAssetsSendWizard'

import PasswordStep, {
  type SaveValuesFunction,
} from './PasswordStepForm'

type OwnProps = {|
  saveValues: SaveValuesFunction,
|}

const mapStateToProps = (state: AppState) => {
  const walletId = selectActiveWalletId(state)

  if (!walletId) {
    throw new Error('InvalidWalletId')
  }

  return {
    walletId,
  }
}

const mapDispatchToProps = {
  requestPrivateKey,
}

export default (
  // eslint-disable-next-line no-undef
  connect < AppState, any, OwnProps, _, _ > (mapStateToProps, mapDispatchToProps)
)(PasswordStep)
