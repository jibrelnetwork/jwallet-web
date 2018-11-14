// @flow

import React, { Component } from 'react'
import classNames from 'classnames'

import JLogo from 'components/base/JLogo'

import MenuPanelActions from './Actions'
import MenuPanelMainAction from './MainAction'
import MenuPanelBalanceTicker from './BalanceTicker'
import MenuPanelWalletManager from './WalletManager'

type Props = {|
  +wallet: ?Wallet,
|}

type ComponentState = {|
  isActionsMoreActive: boolean,
|}

class MenuPanel extends Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isActionsMoreActive: false,
    }
  }

  toggleActionsMore = () => this.setState({ isActionsMoreActive: !this.state.isActionsMoreActive })

  render() {
    const { wallet }: Props = this.props

    if (!wallet) {
      return null
    }

    const {
      type,
      isReadOnly,
    }: Wallet = wallet

    const { isActionsMoreActive }: ComponentState = this.state

    return (
      <div className={classNames('menu-panel', isReadOnly && '-read-only')}>
        <div className='top'>
          <div className='logo'>
            <JLogo isMinimal />
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
        <div className='wallet'>
          <MenuPanelWalletManager />
        </div>
      </div>
    )
  }
}

export default MenuPanel
