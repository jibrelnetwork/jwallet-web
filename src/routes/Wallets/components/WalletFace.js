// @flow

import React from 'react'

import { JCard, JFlatButton, JIcon, JText } from 'components/base'

const WalletFace = ({ onClick, showActions, title, iconName, description }: Props) => (
  <JCard color='blue' withShadow>
    <div onClick={onClick} className='wallet-face'>
      <div className='icon'>
        <JIcon name={iconName} size='medium' color='white' />
      </div>
      <div className='data'>
        <div className='title'>
          <JText value={title} size='large' color='white' />
        </div>
        <div className='description'>
          <JText value={description} color='white' />
        </div>
      </div>
      {showActions && (
        <div className='actions'>
          <div className='button'>
            <JFlatButton
              onClick={showActions}
              iconName='dots'
              iconSize='medium'
              iconColor='white'
              isTransparent
            />
          </div>
        </div>
      )}
    </div>
  </JCard>
)

type Props = {
  onClick: Function,
  showActions: ?Function,
  title: string,
  iconName: string,
  description: string,
}

WalletFace.defaultProps = {
  showActions: null,
}

export default WalletFace
