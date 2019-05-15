// @flow strict

import React from 'react'

import { JLink } from 'components/base'

import style from './fieldPreview.m.scss'

type Props = {
  +label: string,
  +body: string,
  +link: string,
  +hasCopy: boolean,
  +hasAddContact: boolean,
}

export function FieldPreview({
  label,
  body,
  link,
  hasAddContact,
  hasCopy,
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
        {hasAddContact && <div>A</div>}
        {hasCopy && <div>C</div>}
      </div>
    </div>
  )
}
