import React from 'react'
import { pure } from 'recompose'
import classNames from 'classnames'

import './JCard.scss'

type Props = {
  children: React.Node,
  withShadow: ?bool,
}

const JCard = ({ withShadow, children }: Props) => (
  <div className={classNames('JCard', { '-with-shadow': withShadow })} >
    {children}
  </div>
)

export default pure(JCard)
