// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { JCard, JFlatButton, JIcon, JText } from 'components/base'

type Props = {|
  +onClick: Function,
  +showActions: ?Function,
  +title: string,
  +iconName: string,
  +description: string,
  +isReadOnly: boolean,
  +isTransparent: boolean,
|}

class WalletFace extends PureComponent<Props> {
  static defaultProps = {
    showActions: null,
    isReadOnly: false,
    isTransparent: false,
  }

  render() {
    const {
      onClick,
      showActions,
      title,
      iconName,
      description,
      isReadOnly,
      isTransparent,
    }: Props = this.props

    return (
      <JCard color='blue'>
        <div onClick={onClick} className='wallet-face'>
          <div className={classNames('icon', (isTransparent || isReadOnly) && '-transparent')}>
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
                  isTransparent
                  isHoverOpacity
                />
              </div>
            </div>
          )}
        </div>
      </JCard>
    )
  }
}

export default WalletFace
