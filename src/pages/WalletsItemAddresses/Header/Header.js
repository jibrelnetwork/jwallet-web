// @flow strict

import React from 'react'
import { t } from 'ttag'

import { TitleHeader } from 'components'

import {
  JIcon,
  Button,
} from 'components/base'

import headerStyle from './header.m.scss'

type Props = {|
  +onAdd: () => any,
|}

export function Header({ onAdd: handleAdd }: Props) {
  return (
    <div className={headerStyle.core}>
      <TitleHeader title={t`Manage Addresses`} />
      <Button
        onClick={handleAdd}
        className={headerStyle.add}
        theme='additional-icon'
      >
        <JIcon
          name='ic_add_24-use-fill'
          className={headerStyle.icon}
        />
        <span className={headerStyle.label}>
          {t`Add New Address`}
        </span>
      </Button>
    </div>
  )
}
