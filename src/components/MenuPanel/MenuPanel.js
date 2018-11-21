// @flow

import classNames from 'classnames'
import React, { Component } from 'react'

import JLogo from 'components/base/JLogo'
import getWallet from 'utils/wallets/getWallet'

import MenuPanelActions from './Actions'
import MenuPanelMainAction from './MainAction'
import MenuPanelBalanceTicker from './BalanceTicker'
import MenuPanelWalletManager from './WalletManager'

type Props = {|
  +items: Wallets,
  +addresses: Addresses,
  +addressNames: AddressNames,
  +activeWalletId: ?WalletId,
|}

type ComponentState = {|
  isActionsMoreActive: boolean,
  isWalletManagerActive: boolean,
|}

class MenuPanel extends Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isActionsMoreActive: false,
      isWalletManagerActive: false,
    }
  }

  toggleActionsMore = () => {
    this.setState({
      isWalletManagerActive: false,
      isActionsMoreActive: !this.state.isActionsMoreActive,
    })
  }

  toggleWalletManager = () => {
    this.setState({
      isActionsMoreActive: false,
      isWalletManagerActive: !this.state.isWalletManagerActive,
    })
  }

  render() {
    const {
      items,
      addresses,
      addressNames,
      activeWalletId,
    }: Props = this.props

    const wallet: ?Wallet = getWallet(items, activeWalletId)

    if (!wallet) {
      return null
    }

    const {
      type,
      isReadOnly,
    }: Wallet = wallet

    const {
      isActionsMoreActive,
      isWalletManagerActive,
    }: ComponentState = this.state

    return (
      <div className={classNames('menu-panel', isReadOnly && '-read-only')}>
        <div className='top'>
          <div className='logo'>
            <JLogo isOnlyIcon />
          </div>
          <div className='separator' />
          <div className='ticker'>
            <MenuPanelBalanceTicker />
          </div>
        </div>
        <div className='actions'>
          <MenuPanelMainAction type={type} isReadOnly={isReadOnly} />
          <MenuPanelActions toggle={this.toggleActionsMore} isActive={isActionsMoreActive} />
        </div>
        <MenuPanelWalletManager
          toggle={this.toggleWalletManager}
          items={items}
          addresses={addresses}
          addressNames={addressNames}
          activeWalletId={activeWalletId}
          isActive={isWalletManagerActive}
          isReadOnly={isReadOnly}
        />
      </div>
    )
  }
}

export default MenuPanel
