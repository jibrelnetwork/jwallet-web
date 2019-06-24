// @flow strict

import { connect } from 'react-redux'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import { getShortenedAddress } from 'utils/address'

import {
  type Props,
  ContactsItemDetailsInternal,
} from './ContactsItemDetailsInternal'

type OwnProps = {|
  +className: ?string,
  +contactId: ContactId,
|}

export const ContactsItemDetails = connect<Props, OwnProps, _, _, _, _>(
  (state: AppState, ownProps: OwnProps) => {
    const { blockExplorerUISubdomain } = selectCurrentNetworkOrThrow(state)
    const name = getShortenedAddress(ownProps.contactId)
    const id = ownProps.contactId

    return {
      blockExplorer: blockExplorerUISubdomain,
      name,
      id,
    }
  },
)(ContactsItemDetailsInternal)
