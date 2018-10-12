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
  isReadOnly,
}: Props) => (
  <JCard color='blue'>
    <div onClick={onClick} className='wallet-face'>
      <div className={classNames('icon', isReadOnly && '-transparent')}>
        <JIcon name={iconName} size='medium' color='white' />
      </div>
      <div className='data'>
        <div className='title'>
          <JText value={title} size='large' color='white' />
        </div>
        <div className='description'>
          {isReadOnly && (
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
              isHoverOpacity
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
  isReadOnly: boolean,
}

WalletFace.defaultProps = {
  showActions: null,
  isReadOnly: false,
}

export default WalletFace
