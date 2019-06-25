// @flow strict

import { connect } from 'react-redux'

import {
  type Props,
  ContactsItemAddView,
} from './ContactsItemAddView'

type OwnProps = {|
  +address?: ContactId,
  +name?: string,
  +note?: string,
|}

function mapStateToProps(
  state: AppState,
  {
    address,
    name,
    note,
  }: OwnProps,
) {
  const handledAddress = address || ''
  const handledNote = note || ''
  const handledName = name || 'Sara Jessica Parcel'

  return {
    address: handledAddress,
    note: handledNote,
    name: handledName,
  }
}

export const ContactsItemAdd =
  connect< Props, OwnProps, _, _, _, _ >(mapStateToProps)(ContactsItemAddView)
