// @flow

import React from 'react'
import classNames from 'classnames'

import indicatorStyle from './indicator.m.scss'

export type IndicatorStatus = 'red' | 'orange' | 'yellow' | 'green' | 'fetching'

type Props = {|
  +status: ?IndicatorStatus,
|}

export function Indicator({ status }: Props) {
  return !status ? null : (
    <div className={indicatorStyle.core}>
      <div className={classNames(indicatorStyle.indicator, indicatorStyle[status])} />
    </div>
  )
}
