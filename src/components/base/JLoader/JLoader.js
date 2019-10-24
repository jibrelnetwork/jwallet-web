// @flow

import React from 'react'

export type JLoaderColor = 'blue' | 'gray' | 'white' | 'sky' | 'dark'

type Props = {|
  +color: JLoaderColor,
|}

const JLoader = ({ color }: Props) => (
  <div className={`j-loader -${color}`}>
    <div className='dot -first' />
    <div className='dot -second' />
    <div className='dot -third' />
  </div>
)

export default JLoader
