// @flow strict

import React, { useState } from 'react'
import classNames from 'classnames'
import { i18n } from 'i18n/lingui'

import {
  JIcon,
  JInput,
  JLink,
} from 'components/base'
import { FieldPreview } from 'components'
import { getAddressLink } from 'utils/transactions'
import { getShortenedAddress } from 'utils/address'

import offset from 'styles/offsets.m.scss'

import style from './contactsItem.m.scss'

export type Props = {
  blockExplorer: BlockExplorerUISubdomain,
  name: string,
  id: string,
  className: ?string,
}

function Component(props: Props) {
  const [noteText, setNoteText] = useState('')

  return (
    <div className={classNames(style.core, props.className)}>
      <div className={classNames(style.card, offset.mb16)}>
        <div className={style.header}>
          <JLink href={`/contacts/${props.id}/edit`} className={style.action}>
            <JIcon name='ic_edit_24-use-fill' />
          </JLink>
        </div>
        <div className={style.contactPreview}>
          <JIcon name='ic_account_48-use-fill' className={style.contactAvatar} />
          <h2 className={style.contactTitle}>{props.name}</h2>
        </div>
        <FieldPreview
          label={i18n._(
            'common.ContactsItemDetails.address.title',
            null,
            { defaults: 'Address' },
          )}
          body={getShortenedAddress(props.name)}
          link={getAddressLink(props.id, props.blockExplorer)}
          copy={props.id}
          copyMessage='Address was copied.'
        />
      </div>
      <div className={style.noteWrapper}>
        <JInput
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
          value={noteText}
          onChange={setNoteText}
        />
      </div>
    </div>
  )
}

Component.defaultProps = {
  className: undefined,
}

export const ContactsItemDetailsInternal = React.memo<Props>(Component)
