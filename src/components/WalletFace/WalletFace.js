// @flow

import React from 'react'
import classNames from 'classnames'

import { JCard, JFlatButton, JIcon, JText } from 'components/base'

const WalletFace = ({
  onClick,
  showActions,
  title,
  iconName,
  description,
  isTransparent,
  isEyeIcon,
}: Props) => (
  <JCard color='blue'>
    <div onClick={onClick} className='wallet-face'>
      <div className={classNames('icon', isTransparent && '-transparent')}>
        <JIcon name={iconName} size='medium' color='white' />
      </div>
      <div className='data'>
        <div className='title'>
          <JText value={title} size='large' color='white' />
        </div>
        <div className='description'>
          {isEyeIcon && (
            <div className='icon'><JIcon name='eye' size='medium' color='white' /></div>
          )}
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
              isBordered={false}
              isHoverOpacity
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
  isTransparent: boolean,
  isEyeIcon: boolean,
}

WalletFace.defaultProps = {
  showActions: null,
  isTransparent: false,
  isEyeIcon: false,
}

export default WalletFace
