// @flow strict

import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import {
  JIcon,
  JInputField,
  JLink,
} from 'components/base'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import { PageNotFoundError } from 'errors'
import { useI18n } from 'app/hooks'
import { FieldPreview } from 'components'
import { getAddressLink } from 'utils/transactions'
import { getShortenedAddress } from 'utils/address'
import { selectFavorite } from 'store/selectors/favorites'
import * as favorites from 'store/modules/favorites'

import offset from 'styles/offsets.m.scss'
import style from './contactsItemDetails.m.scss'

type Props = {
  blockExplorer: BlockExplorerUISubdomain,
  name: string,
  address: string,
  description: string,
  className: ?string,
  setNoteText: (address: string, description: string) => any,
  /* :: contactId: OwnerAddress, */
}

type OwnProps = {|
  +className: ?string,
  +contactId: OwnerAddress,
|}

function ContactItemDetailsComponent({
  blockExplorer,
  name,
  address,
  description,
  className,
  setNoteText,
}: Props) {
  const i18n = useI18n()

  return (
    <div className={classNames(style.core, className)}>
      <div className={classNames(style.card, offset.mb16)}>
        <div className={style.header}>
          <JLink href={`/contacts/${address}/edit`} className={style.action}>
            <JIcon name='ic_edit_24-use-fill' />
          </JLink>
        </div>
        <div className={style.contactPreview}>
          <JIcon name='ic_account_48-use-fill' className={style.contactAvatar} />
          <h2 className={style.contactTitle}>{name || address}</h2>
        </div>
        <FieldPreview
          value={address}
          valueToShow={getShortenedAddress(address)}
          link={getAddressLink(address, blockExplorer)}
          label={i18n._(
            'common.ContactsItemDetails.address.title',
            null,
            { defaults: 'Address' },
          )}
          isCopyable
        />
      </div>
      <div className={style.noteWrapper}>
        <JInputField
          label={i18n._(
            'common.ContactsItemDetails.note.title',
            null,
            { defaults: 'Note' },
          )}
          infoMessage={i18n._(
            'common.ContactsItemDetails.note.info',
            null,
            { defaults: 'This note is only visible to you.' },
          )}
          color='gray'
          input={{
            value: description,
            onChange: (e: SyntheticInputEvent<HTMLInputElement>) =>
              setNoteText(address, e.target.value),
          }}
          maxLength={256}
        />
      </div>
    </div>
  )
}

ContactItemDetailsComponent.defaultProps = {
  className: undefined,
}

function mapStateToProps(state: AppState, ownProps: OwnProps) {
  const { blockExplorerUISubdomain } = selectCurrentNetworkOrThrow(state)
  const { contactId } = ownProps
  const favorite = selectFavorite(state, contactId)

  if (!favorite) {
    throw new PageNotFoundError()
  }

  const {
    address,
    name = '',
    description = '',
  } = favorite

  return {
    blockExplorer: blockExplorerUISubdomain,
    name,
    address,
    description,
  }
}

const mapDispatchToProps = {
  setNoteText: favorites.setDescription,
}

export const ContactsItemDetails = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(ContactItemDetailsComponent)
