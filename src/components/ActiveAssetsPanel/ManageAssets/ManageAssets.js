// @flow

import React from 'react'

import handle from 'utils/eventHandlers/handle'
import { JIcon, JText } from 'components/base'

const ManageAssets = ({ setHovered, goToDigitalAssets, isHovered }: Props) => (
  <div
    onClick={goToDigitalAssets}
    onMouseEnter={handle(setHovered)(true)}
    onMouseLeave={handle(setHovered)(false)}
    className='manage-assets'
  >
    <div className='icon'>
      <JIcon name='plus' size='small' color={isHovered ? 'sky' : 'blue'} />
    </div>
    <div className='text'>
      <JText value='assetsPanel.button' weight='bold' color={isHovered ? 'sky' : 'blue'} />
    </div>
  </div>
)

type Props = {
  setHovered: Function,
  goToDigitalAssets: Function,
  isHovered: boolean,
}

export default ManageAssets
