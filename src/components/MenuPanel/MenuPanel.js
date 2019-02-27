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
  +getMoreAddresses: () => void,
  +setActiveAddress: (Index) => void,
  +items: Wallets,
  +addresses: Address[],
  +addressNames: AddressNames,
  +activeWalletId: ?WalletId,
  +fiatCurrency: FiatCurrency,
  +fiatBalance: number,
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
      getMoreAddresses,
      setActiveAddress,
      items,
      addresses,
      addressNames,
      fiatCurrency,
      activeWalletId,
      fiatBalance,
    }: Props = this.props

    try {
      const wallet: Wallet = getWallet(items, activeWalletId)

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
              <MenuPanelBalanceTicker balance={fiatBalance} currency={fiatCurrency} />
            </div>
          </div>
          <div className='actions'>
            <MenuPanelMainAction
              type={type}
              isReadOnly={isReadOnly}
            />
            <MenuPanelActions
              toggle={this.toggleActionsMore}
              isActive={isActionsMoreActive}
              activeWalletId={activeWalletId}
            />
          </div>
          <MenuPanelWalletManager
            toggle={this.toggleWalletManager}
            getMoreAddresses={getMoreAddresses}
            setActiveAddress={setActiveAddress}
            items={items}
            addresses={addresses}
            addressNames={addressNames}
            activeWalletId={activeWalletId}
            isActive={isWalletManagerActive}
          />
        </div>
      )
    } catch (err) {
      return null
    }
  }
}

export default MenuPanel
