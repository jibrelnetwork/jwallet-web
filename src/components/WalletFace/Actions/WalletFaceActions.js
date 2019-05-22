// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { t } from 'ttag'

import {
  JFlatButton,
} from 'components/base'

// import { ethereum } from 'data/assets'
// import { formatAssetBalance } from 'utils/formatters'

import walletFaceActions from './walletFaceActions.m.scss'

type WalletFaceActionsHandler = (SyntheticEvent<HTMLDivElement>) => void
type WalletFaceActionIconName = 'edit' | 'to-multiaddress' | 'to-oneaddress' | 'import' | 'bucket'

type WalletFaceAction = {|
  +handler: ?WalletFaceActionsHandler,
  +iconName: WalletFaceActionIconName,
  +tooltip: string,
|}

type Props = {|
  +toggle: WalletFaceActionsHandler,
  +backup: ?WalletFaceActionsHandler,
  +rename: ?WalletFaceActionsHandler,
  +remove: ?WalletFaceActionsHandler,
  +simplify: ?WalletFaceActionsHandler,
  // +balance: ?string,
  +isToggled: boolean,
  +isSimplified: ?boolean,
|}

class WalletFaceActions extends PureComponent<Props> {
  getActions = (): WalletFaceAction[] => {
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
      // balance,
      isToggled,
    }: Props = this.props

    return (
      <div className={classNames(
        walletFaceActions.core,
        isToggled && walletFaceActions['-toggled'],
      )}
      >
        <div onClick={toggle} className={walletFaceActions.overlay} />
        <div className={walletFaceActions.icon}>
          <JFlatButton
            onClick={toggle}
            iconName='kebab-menu-use-fill'
            iconColor='white'
            isHoverOpacity
          />
        </div>
        {isToggled && (
          <div className={walletFaceActions.actions}>
            {/* {balance && (
              <JText
                value={`${formatAssetBalance(ethereum.blockchainParams.address, balance)} ETH`}
                color='white'
              />
            )}
            {this.getActions().map((action: WalletFaceAction) => {
              const {
                handler,
                iconName,
              }: WalletFaceAction = action

              return !handler ? null : (
                <div className={walletFaceActions.action} key={iconName}>
                  <JFlatButton
                    onClick={handler}
                    iconName={iconName}
                    iconColor='white'
                    isHoverOpacity
                    title={action.tooltip}
                  />
                </div>
              )
            })} */}
            <div className={walletFaceActions.action}>Copy Wallet Address</div>
            <div className={walletFaceActions.action}>Rename Wallet</div>
            <div className={walletFaceActions.action}>Enable Multi-Address Mode</div>
            <div className={walletFaceActions.action}>Backup Wallet</div>
            <div className={walletFaceActions.action}>Delete Wallet</div>
          </div>
        )}
      </div>
    )
  }
}

export default WalletFaceActions
