// @flow

import React from 'react'

const JCard = ({ children, title, color }: Props) => (
  <div className={`j-card -${color}`}>
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
  children?: ?React$Node,
  title?: string,
  color: 'blue' | 'white'
}

JCard.defaultProps = {
  children: null,
  title: null,
}

export default JCard
