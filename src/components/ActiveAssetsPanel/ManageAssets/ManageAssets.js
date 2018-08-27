// @flow

import React from 'react'
import { JIcon, JText } from 'react-components'

import handle from 'utils/eventHandlers/handle'

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
      <JText value={i18n('assetsPanel.button')} weight='bold' color={isHovered ? 'sky' : 'blue'} />
    </div>
  </div>
)

type Props = {
  setHovered: Function,
  goToDigitalAssets: Function,
  isHovered: boolean,
}

export default ManageAssets
