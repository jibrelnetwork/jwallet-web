// @flow strict

import React from 'react'

export type JLoaderColor = 'blue' | 'gray' | 'white' | 'sky' | 'dark'

type Props = {|
  +color: JLoaderColor,
|}

export default function JLoader({ color }: Props) {
  return (
    <div className={`j-loader -${color}`}>
      <div className='dot -first' />
      <div className='dot -second' />
      <div className='dot -third' />
    </div>
  )
}
