// @flow

import { connect } from 'react-redux'

import {
  RecipientPicker,
  type Props,
} from './RecipientPicker'

type OwnProps = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
|}

function mapStateToProps(state: AppState) {
  return {
    contacts: [],
    wallets: [],
  }
}

export const ConnectedRecipientPicker = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(RecipientPicker)
