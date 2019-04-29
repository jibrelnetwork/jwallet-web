// @flow

import React from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

import { JPickerListItem } from 'components/base/JPicker'
import { generateAddresses } from 'utils/mnemonic'

import { SingleWalletItem } from '../SingleWalletItem/SingleWalletItem'
import { ContactItem } from '../ContactItem/ContactItem'
import jPickerListStyle from './walletList.m.scss'

// declare type Wallet = {|
//   +encrypted: WalletEncryptedData,
//   +createdBlockNumber: ?WalletCreatedBlockNumber,
//   +id: string,
//   +name: string,
//   +type: WalletType,
//   +address: ?string,
//   +derivationPath: ?string,
//   +bip32XPublicKey: ?string,
//   +customType: WalletCustomType,
//   +orderIndex: number,
//   +addressIndex: ?number,
//   +network: null | number | string,
//   +isReadOnly: boolean,
//   +isSimplified: ?boolean,
// |}

// type SelectedWalletItem = {
//   walletId: string,
//   address: string,
// }

type Props = {|
  +activeItem: ?string,
  +onChange: (item: string) => any,
  +onMnemonicWalletToggle: (walletId: string) => any,
  +wallets: Wallet[],
  +balances: WalletsBalances,
  +searchQuery: string,
  +openWallets: string[],
|}

type ComponentState = {|
  +focusedItemKey: ?string,
|}

class WalletList extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    focusedItemKey: null,
  }

  handleItemFocus = (itemKey: string) => () => {
    this.setState({ focusedItemKey: itemKey })
  }

  handleItemBlur = () => {
    this.setState({ focusedItemKey: null })
  }

  handleItemClick = (itemKey: string) => () => {
    // if (this.props.onItemClick) {
    //   this.props.onItemClick(itemKey)
    // }
  }

  handleMnemonicWalletToggle = walletId => () => this.props.onMnemonicWalletToggle(walletId)

  render() {
    const {
      activeItem,
      wallets,
      balances,
      openWallets,
    } = this.props

    const {
      focusedItemKey,
    } = this.state

    const count = 4

    return (
      <div
        className={classNames(
          jPickerListStyle.core,
          jPickerListStyle[`count-${count}`],
        )}
      >
        {wallets.map((wallet) => {
          // #TODO: Investigate how to check when wallet is single/mnemonic
          const isSingleWallet = (wallet.isSimplified || wallet.isReadOnly) && wallet.address

          if (isSingleWallet) {
            const walletId = wallet.id
            const fiatBalance = wallet && wallet.address
              ? balances[wallet.address]
              : null

            return (
              <JPickerListItem
                key={`single-${walletId}`}
                isSelected={!!activeItem && activeItem === walletId}
                isFocused={!!focusedItemKey && focusedItemKey === walletId}
                onClick={this.handleItemClick({
                  walletId: wallet.id,
                  address: wallet.address,
                })}
                onFocus={this.handleItemFocus(walletId)}
                onBlur={this.handleItemBlur}
              >
                <SingleWalletItem
                  fiatBalance={fiatBalance}
                  title={wallet.name}
                />
              </JPickerListItem>
            )
          } else {
            const walletId = wallet.id
            const walletAddresses = generateAddresses(
              wallet.bip32XPublicKey,
              0,
              wallet.addressIndex,
            )
            const isOpen = !!openWallets.find(w => w === walletId)

            return (
              <div
                key={`mnemonic-${walletId}`}
                className={classNames(
                  jPickerListStyle.mnemonicWallet,
                  isOpen && jPickerListStyle.isOpen,
                )}
              >
                <JPickerListItem
                  key={`mnemonicItem-${walletId}`}
                  isFocused={!!focusedItemKey && focusedItemKey === walletId}
                  onClick={this.handleMnemonicWalletToggle}
                  onFocus={this.handleItemFocus(walletId)}
                  onBlur={this.handleItemBlur}
                >
                  <SingleWalletItem
                    title={wallet.name}
                  />
                </JPickerListItem>
                {walletAddresses.map((address, index) => (
                  <JPickerListItem
                    key={`mnemonicAddr-${address}`}
                    isSelected={!!activeItem && activeItem === address}
                    isFocused={!!focusedItemKey && focusedItemKey === address}
                    onClick={this.handleMnemonicWalletToggle}
                    onFocus={this.handleItemFocus(address)}
                    onBlur={this.handleItemBlur}
                  >
                    <ContactItem
                      key={address}
                      address={address}
                      name={t`Address ${index + 1}`}
                      description={address}
                    />
                  </JPickerListItem>
                ))}
              </div>
            )
          }
        })}
      </div>
    )
  }
}

export { WalletList }
