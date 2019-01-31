// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import {
  JText,
  JFlatButton,
} from 'components/base'

import ethereum from 'data/assets/ethereum'

import { formatAssetBalance } from 'utils/formatters'

type WalletFaceActionsHandler = () => void

type WalletFaceAction = {|
  +handler: ?WalletFaceActionsHandler,
  +iconName: 'edit' | 'import' | 'bucket',
|}

type Props = {|
  +toggle: WalletFaceActionsHandler,
  +backup: ?WalletFaceActionsHandler,
  +rename: ?WalletFaceActionsHandler,
  +remove: ?WalletFaceActionsHandler,
  +balance: ?string,
  +isToggled: boolean,
|}

class WalletFaceActions extends PureComponent<Props> {
  getActions = (): Array<WalletFaceAction> => {
    const {
      backup,
      rename,
      remove,
    }: Props = this.props

    return [
      { iconName: 'import', handler: backup },
      { iconName: 'edit', handler: rename },
      { iconName: 'bucket', handler: remove },
    ]
  }

  render() {
    const {
      toggle,
      balance,
      isToggled,
    }: Props = this.props

    return (
      <div className={classNames('wallet-face-actions', isToggled && '-toggled')}>
        <div onClick={toggle} className='overlay' />
        {isToggled ? (
          <div className='actions'>
            {balance && (
              <JText
                value={`${formatAssetBalance(ethereum.blockchainParams.address, balance)} ETH`}
                color='white'
              />
            )}
            {this.getActions().map((action: WalletFaceAction) => {
              const { handler, iconName }: WalletFaceAction = action

              return !handler ? null : (
                <div className='action' key={iconName}>
                  <JFlatButton
                    onClick={handler}
                    iconName={iconName}
                    iconSize='medium'
                    iconColor='white'
                    isHoverOpacity
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <JFlatButton
            onClick={toggle}
            iconName='dots'
            iconSize='medium'
            iconColor='white'
            isTransparent
            isHoverOpacity
          />
        )}
      </div>
    )
  }
}

export default WalletFaceActions
