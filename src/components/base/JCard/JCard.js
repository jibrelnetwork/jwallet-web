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
  children: ?Object,
  title: ?string,
  color: 'blue' | 'white',
}

export default JCard
