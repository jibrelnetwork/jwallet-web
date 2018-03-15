// @flow

import React from 'react'
import classNames from 'classnames'

const JCard = ({ withShadow, children }: Props) => (
  <div className={classNames('j-card', { '-with-shadow': withShadow })}>
    {children}
  </div>
)

type Props = {
  children: Object,
  withShadow: ?bool,
}

export default JCard
