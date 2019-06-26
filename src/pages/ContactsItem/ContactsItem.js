// @flow strict

import { connect } from 'react-redux'

import {
  type Props,
  ContactsItemView,
} from 'pages/ContactsItem/ContactsItemView'

type OwnProps = {|
  +contactId: ContactId,
|}

function mapStateToProps(state: AppState, { contactId }: OwnProps) {
  // const hasTransaction = transactionsIndex(state)[itemId] !== undefined

  // if (!hasTransaction) {
  //   throw new PageNotFoundError()
  // }

  return { contactId }
}

export const ContactsItem =
  connect< Props, OwnProps, _, _, _, _ >(mapStateToProps)(ContactsItemView)
