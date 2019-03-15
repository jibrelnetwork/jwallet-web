// @flow

import React from 'react'

import { JIcon } from 'components/base'

type Props = {|
  +onClick: () => void,
|}

const AddAsset = ({ onClick }: Props) => (
  <div className='add-asset' onClick={onClick}>
    <div className='icon'>
      <JIcon
        color='gray'
        name='cross-medium'
      />
    </div>
  </div>
)

export default AddAsset
