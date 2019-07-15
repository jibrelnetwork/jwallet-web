// @flow strict

import React from 'react'
import { useI18n } from 'app/hooks'

import {
  JLink,
  JIcon,
} from 'components/base'
import { clipboard } from 'services'

import style from './fieldPreview.m.scss'

type Props = {
  +label: string,
  +body: string,
  link?: string,
  contact?: string,
  copy?: ?string,
  copyMessage?: ?string,
}

function copyToClipboard({ currentTarget }: SyntheticEvent<HTMLButtonElement>): void {
  const value = currentTarget.getAttribute('data-value')
  const message = currentTarget.getAttribute('data-message')

  if (value) {
    clipboard.copyText(value)
  }

  if (message) {
    // FIXME: Call real snackbar method
    alert(message)
  }
}

function FieldPreviewInternal({
  label,
  body,
  link,
  contact,
  copy,
  copyMessage,
}: Props) {
  const i18n = useI18n()

  return (
    <div className={style.core}>
      <div className={style.data}>
        <div className={style.label}>{label}</div>
        <div className={style.body}>
          {
            link
              ? <JLink className={style.link} href={link}>{body}</JLink>
              : <span>{body}</span>
          }
        </div>
      </div>
      <div className={style.actions}>
        {contact && (
          <JLink
            className={style.action}
            title={i18n._(
              'common.FieldPreview.action.addContact',
              null,
              { defaults: 'Add Contact' },
            )}
            href={`/contacts/add?address=${contact}`}
          >
            <JIcon
              className={style.actionIcon}
              name='add-contact-use-fill'
            />
          </JLink>)
        }
        {copy && (
          <button
            className={style.action}
            type='button'
            title={i18n._(
              'common.FieldPreview.action.copy',
              null,
              { defaults: 'Copy' },
            )}
            data-value={copy}
            data-message={copyMessage}
            onClick={copyToClipboard}
          >
            <JIcon
              className={style.actionIcon}
              name='copy-use-fill'
            />
          </button>)
        }
      </div>
    </div>
  )
}

FieldPreviewInternal.defaultProps = {
  link: '',
  contact: '',
  copy: undefined,
  copyMessage: undefined,
}

export const FieldPreview = React.memo<Props>(FieldPreviewInternal)
