// @flow

import React from 'react'
import classNames from 'classnames'

import { type JInputColor } from 'components/base/JInput/JInput'

import indicatorStyle from './indicator.m.scss'

export type IndicatorStatus = 'red' | 'orange' | 'yellow' | 'green' | 'fetching'

type Props = {|
  +fieldColor: JInputColor,
  +status: ?IndicatorStatus,
|}

export function Indicator({
  status,
  fieldColor,
}: Props) {
  return !status ? null : (
    <div className={classNames(indicatorStyle.core, indicatorStyle[`field-${fieldColor}`])}>
      <div className={classNames(indicatorStyle.indicator, indicatorStyle[status])} />
    </div>
  )
}
