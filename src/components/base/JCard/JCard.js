// @flow

import React from 'react'
import classNames from 'classnames'

const JCard = ({ children, title, color, withShadow }: Props) => (
  <div className={classNames(`j-card -${color}`, withShadow && '-shadow')}>
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
  color: 'blue' | 'white',
  withShadow: boolean,
}

JCard.defaultProps = {
  color: 'white',
  withShadow: false,
}

export default JCard
