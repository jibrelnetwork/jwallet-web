// @flow

import React, { Fragment } from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

import { JPickerListItem } from 'components/base/JPicker'
import { SingleWalletItem } from '../SingleWalletItem/SingleWalletItem'
import { MultiAddressWalletItem } from '../MultiAddressWalletItem/MultiAddressWalletItem'
import { ContactItem } from '../ContactItem/ContactItem'
import { type RecipientPickerWallet } from '../RecipientPicker'

import jPickerListStyle from './walletList.m.scss'

type Props = {|
  +activeWalletAddress: ?string,
  +onChange: (item: string) => any,
  +onMnemonicWalletToggle: (walletId: string) => any,
  +wallets: RecipientPickerWallet[],
  +openWalletIds: string[],
  +isWalletsForceOpened: boolean,
|}

type ComponentState = {|
  +focusedItem: ?string,
|}

function getLineCount(wallets: RecipientPickerWallet[]) {
  // eslint-disable-next-line fp/no-let
  let num = 0

  wallets.forEach((wallet) => {
    // eslint-disable-next-line fp/no-mutation
    num += 1

    if (wallet.addresses) {
      // eslint-disable-next-line fp/no-mutation
      num += wallet.addresses.length
    }
  })

  return num
}

class WalletList extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    focusedItem: null,
  }

  handleItemFocus = (item: string) => () => {
    this.setState({ focusedItem: item })
  }

  handleItemBlur = () => {
    this.setState({ focusedItem: null })
  }

  handleItemClick = (address: string) => () => {
    if (this.props.onChange) {
      this.props.onChange(address)
    }
  }

  handleMnemonicWalletToggle = (walletId: string) => (e: SyntheticEvent<*>) => {
    e.stopPropagation()
    this.props.onMnemonicWalletToggle(walletId)
  }

  renderSingleWalletItem = (wallet: RecipientPickerWallet) => {
    const {
      activeWalletAddress,
    } = this.props

    const {
      focusedItem,
    } = this.state

    const {
      id,
      name,
      addresses,
    } = wallet

    if (!addresses.length) {
      // impossible, and wallet will be skipped
      return null
    }

    const walletAddress = addresses[0]
    const isActive = !!activeWalletAddress && activeWalletAddress === walletAddress.address
    const isFocused = !!focusedItem && focusedItem === id
    const walletName = name || walletAddress.name || ''
    const fiatBalance = walletAddress.fiatBalance || ''

    return (
      <JPickerListItem
        key={`single-wallet-${id}`}
        isSelected={isActive}
        isFocused={isFocused}
        onClick={this.handleItemClick(walletAddress.address)}
        onFocus={this.handleItemFocus(id)}
        onBlur={this.handleItemBlur}
      >
        <SingleWalletItem
          fiatBalance={fiatBalance}
          title={walletName}
        />
      </JPickerListItem>
    )
  }

  renderMultiAddressWalletItem = (wallet: RecipientPickerWallet) => {
    const {
      id,
      name: walletName,
      addresses,
    } = wallet

    const {
      focusedItem,
    } = this.state

    const {
      activeWalletAddress,
      openWalletIds,
      isWalletsForceOpened,
    } = this.props

    if (!addresses.length) {
      // impossible, and wallet will be skipped
      return null
    }

    const isOpen = isWalletsForceOpened || (openWalletIds && !!openWalletIds.find(w => w === id))

    return (
      <Fragment key={`multi-address-wallet-${id}`}>
        <JPickerListItem
          isFocused={!!focusedItem && focusedItem === id}
          onClick={this.handleMnemonicWalletToggle(id)}
          onFocus={this.handleItemFocus(id)}
          onBlur={this.handleItemBlur}
        >
          <MultiAddressWalletItem
            title={walletName}
            addressCount={addresses.length}
            isOpen={isOpen}
          />
        </JPickerListItem>
        <div className={classNames(
          jPickerListStyle.sublist,
          isOpen && jPickerListStyle.isOpen,
        )}
        >
          {addresses.map(({
            address, name, fiatBalance,
          }, index) => (
            <JPickerListItem
              key={`wallet-address-${address}`}
              isSelected={!!activeWalletAddress && activeWalletAddress === address}
              isFocused={!!focusedItem && focusedItem === address}
              onFocus={this.handleItemFocus(address)}
              onBlur={this.handleItemBlur}
              onClick={this.handleItemClick(address)}
            >
              <ContactItem
                key={address}
                address={address}
                name={name || t`Address ${index + 1}`}
                description={address}
                fiatBalance={fiatBalance}
              />
            </JPickerListItem>
          ))}
        </div>
      </Fragment>
    )
  }

  render() {
    const {
      wallets,
    } = this.props

    const count = getLineCount(wallets)

    return (
      <div
        className={classNames(
          jPickerListStyle.core,
          jPickerListStyle[`count-${count}`],
        )}
      >
        {wallets.map((wallet) => {
          const { type } = wallet

          if (type === 'mnemonic') {
            return this.renderMultiAddressWalletItem(wallet)
          } else {
            return this.renderSingleWalletItem(wallet)
          }
        }).filter(Boolean)}
      </div>
    )
  }
}

export { WalletList }
