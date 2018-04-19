// @flow

import React from 'react'
import classNames from 'classnames'

const JCard = ({ children, title, withShadow }: Props) => (
  <div className={classNames('j-card', { '-with-shadow': withShadow })}>
    {title && (
      <div className='title'>
        {title}
      </div>
    )}
    {children && (
      <div className='content'>
        {children}
      </div>
    )}
  </div>
)

type Props = {
  children: ?Object,
  title: ?string,
  withShadow: ?bool,
}

JCard.defaultProps = {
  children: null,
  title: null,
  withShadow: false,
}

export default JCard
