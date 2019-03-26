// @flow

import React from 'react'
import classNames from 'classnames'

import { type IndicatorStatus } from '../PasswordField'

import indicatorStyle from './indicator.m.scss'

type IndicatorColor = 'white' | 'gray'

type Props = {|
  +status: ?IndicatorStatus,
  +color: IndicatorColor,
|}

export function Indicator({
  color,
  status,
}: Props) {
  return !status ? null : (
    <div className={classNames(indicatorStyle.core, indicatorStyle[`field-${color}`])}>
      <div className={classNames(indicatorStyle.indicator, indicatorStyle[status])} />
    </div>
  )
}
