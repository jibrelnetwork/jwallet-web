// @flow

import React from 'react'

import {
  JIcon,
  JLink,
} from 'components/base'

export function AddAsset() {
  return (
    <JLink
      href='/assets'
      className='add-asset'
    >
      <div className='icon'>
        <JIcon
          color='gray'
          name='cross-medium'
        />
      </div>
    </JLink>
  )
}
