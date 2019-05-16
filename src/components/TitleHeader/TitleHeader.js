// @flow strict

import React from 'react'

import { JIcon } from 'components/base'

import titleHeaderStyle from './titleHeader.m.scss'

type TitleHeaderHandler = () => void

type Props = {|
  +onBack: ?TitleHeaderHandler,
  +title: string,
|}

export function TitleHeader({
  onBack: handleClick,
  title,
}: Props) {
  return (
    <div className={titleHeaderStyle.core}>
      <h1 className={titleHeaderStyle.title}>{title}</h1>
      {handleClick && (
        <div
          onClick={handleClick}
          className={titleHeaderStyle.back}
        >
          <JIcon name='arrow-back-use-fill' size='medium' color='blue' />
        </div>
      )}
    </div>
  )
}
