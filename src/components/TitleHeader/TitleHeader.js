// @flow strict

import React from 'react'

import { JIcon } from 'components/base'

import style from './titleHeader.m.scss'

type TitleHeaderHandler = () => any

type Props = {|
  +onBack: ?TitleHeaderHandler,
  +children: React$Node,
  +title: string,
|}

export function TitleHeader({
  onBack: handleClick,
  children,
  title,
}: Props) {
  return (
    <div className={style.core}>
      {handleClick && (
        <div
          onClick={handleClick}
          className={style.back}
        >
          <JIcon name='arrow-back-use-fill' size='medium' color='blue' />
        </div>
      )}
      <h1 className={style.title}>{title}</h1>
      {children && (
        <aside className={style.aside}>
          {children}
        </aside>
      )}
    </div>
  )
}

TitleHeader.defaultProps = {
  onBack: undefined,
  children: null,
}
