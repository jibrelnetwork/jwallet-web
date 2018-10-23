// @flow

import React, { PureComponent } from 'react'

import checkMnemonicType from 'utils/keystore/checkMnemonicType'
import { handle, ignoreEvent } from 'utils/eventHandlers'

import {
  WalletFace,
  WalletActions,
  WalletLoading,
} from 'components'

const WALLET_TYPE_ICON_MAP: { [WalletType]: string } = {
  'mnemonic': 'multy',
  'address': 'binding',
}

type Props = {|
  +renameWallet: (WalletId) => void,
  +backupWallet: (WalletId) => void,
  +deleteWallet: (WalletId) => void,
  +toggleWallet: (WalletId) => void,
  +setActiveWallet: Function,
  +walletData: Wallet,
  +isLoading: ?boolean,
  +isToggled: ?boolean,
|}

class WalletCard extends PureComponent<Props> {
  static defaultProps = {
    isLoading: false,
    isToggled: false,
  }

  render() {
    const {
      renameWallet,
      backupWallet,
      deleteWallet,
      toggleWallet,
      setActiveWallet,
      walletData,
      isLoading,
      isToggled,
    }: Props = this.props

    const {
      id,
      name,
      type,
      address,
      isReadOnly,
    }: Wallet = walletData

    const isMnemonic: boolean = checkMnemonicType(type)
    const iconName: string = WALLET_TYPE_ICON_MAP[type]

    if (isToggled) {
      return (
        <WalletActions
          renameWallet={handle(renameWallet)(id)}
          backupWallet={handle(backupWallet)(id)}
          deleteWallet={handle(deleteWallet)(id)}
        />
      )
    }

    if (isLoading) {
      return <WalletLoading />
    }

    const description: string = (!isMnemonic && address)
      ? `${address.substr(0, 15)}...${address.substr(-6)}`
      : 'Mnemonic, many addresses'

    return (
      <WalletFace
        onClick={handle(setActiveWallet)(id)}
        showActions={ignoreEvent(toggleWallet)(id)}
        title={name}
        iconName={iconName}
        description={isReadOnly ? `${description}, read only` : description}
        isReadOnly={isReadOnly}
      />
    )
  }
}

export default WalletCard
