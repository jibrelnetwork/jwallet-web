// @flow strict

import React from 'react'
import { t } from 'ttag'

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
  copy?: string,
}

function copyToClipboard({ currentTarget }: SyntheticEvent<HTMLButtonElement>): void {
  const value = currentTarget.getAttribute('data-value')

  if (value) {
    clipboard.copyText(value)
  }
}

function FieldPreviewInternal({
  label,
  body,
  link,
  contact,
  copy,
}: Props) {
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
            title={t`Add Contact`}
            href={`/contacts/add?address=${contact}`}
          >
            <JIcon name='add-contact-use-fill' />
          </JLink>)
        }
        {copy && (
          <button
            className={style.action}
            type='button'
            title={t`Copy`}
            data-value={copy}
            onClick={copyToClipboard}
          >
            <JIcon name='copy-use-fill' />
          </button>)
        }
      </div>
    </div>
  )
}

FieldPreviewInternal.defaultProps = {
  link: '',
  contact: '',
  copy: '',
}

export const FieldPreview = React.memo/* :: <Props> */(FieldPreviewInternal)
