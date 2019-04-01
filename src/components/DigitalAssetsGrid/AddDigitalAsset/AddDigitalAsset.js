// @flow

import React from 'react'

import {
  JIcon,
  JLink,
} from 'components/base'

const AddAsset = () => (
  <JLink
    href='/digital-assets/manage'
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

export default AddAsset
