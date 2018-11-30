// @flow

import React from 'react'

const JLoader = ({ color }: Props) => (
  <div className={`j-loader -${color}`}>
    <div className='dot -first' />
    <div className='dot -second' />
    <div className='dot -third' />
  </div>
)

type Props = {
  color: 'blue' | 'gray' | 'white' | 'sky' | 'dark',
}

export default JLoader
