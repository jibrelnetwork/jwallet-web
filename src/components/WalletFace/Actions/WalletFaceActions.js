// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { t } from 'ttag'

import {
  JText,
  JFlatButton,
} from 'components/base'

import ethereum from 'data/assets/ethereum'

import { formatAssetBalance } from 'utils/formatters'

type WalletFaceActionsHandler = (SyntheticEvent<HTMLDivElement>) => void

type WalletFaceAction = {|
  +handler: ?WalletFaceActionsHandler,
  +iconName: 'edit' | 'to-multiaddress' | 'to-oneaddress' | 'import' | 'bucket',
  +tooltip: string,
|}

type Props = {|
  +toggle: WalletFaceActionsHandler,
  +backup: ?WalletFaceActionsHandler,
  +rename: ?WalletFaceActionsHandler,
  +remove: ?WalletFaceActionsHandler,
  +simplify: ?WalletFaceActionsHandler,
  +balance: ?string,
  +isToggled: boolean,
  +isSimplified: ?boolean,
|}

class WalletFaceActions extends PureComponent<Props> {
  getActions = (): Array<WalletFaceAction> => {
    const {
      backup,
      rename,
      remove,
      simplify,
      isSimplified,
    }: Props = this.props

    return [
      {
        iconName: isSimplified ? 'to-multiaddress' : 'to-oneaddress',
        handler: simplify,
        tooltip: isSimplified ?
          t`Convert to multi-address wallet` :
          t`Convert to single-address wallet`,
      },
      {
        iconName: 'import',
        handler: backup,
        tooltip: t`Backup`,
      },
      {
        iconName: 'edit',
        handler: rename,
        tooltip: t`Rename`,
      },
      {
        iconName: 'bucket',
        handler: remove,
        tooltip: t`Delete`,
      },
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
                    iconColor='white'
                    isHoverOpacity
                    title={action.tooltip}
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <JFlatButton
            onClick={toggle}
            iconName='dots'
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
