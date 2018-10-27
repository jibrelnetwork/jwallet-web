// @flow

import React, { PureComponent } from 'react'

import checkMnemonicType from 'utils/keystore/checkMnemonicType'
import { WalletFace, WalletLoading } from 'components'
import { handle, ignoreEvent } from 'utils/eventHandlers'

const WALLET_TYPE_ICON_MAP: { [WalletType]: string } = {
  'mnemonic': 'multy',
  'address': 'binding',
}

type Props = {|
  +renameWallet: (WalletId) => void,
  +backupWallet: (WalletId) => void,
  +deleteWallet: (WalletId) => void,
  +setActiveWallet: Function,
  +walletData: Wallet,
  +isLoading: ?boolean,
|}

class WalletCard extends PureComponent<Props> {
  static defaultProps = {
    isLoading: false,
  }

  render() {
    const {
      renameWallet,
      backupWallet,
      deleteWallet,
      setActiveWallet,
      walletData,
      isLoading,
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

    if (isLoading) {
      return <WalletLoading />
    }

    const description: string = (!isMnemonic && address)
      ? `${address.substr(0, 15)}...${address.substr(-6)}`
      : 'Mnemonic, many addresses'

    return (
      <WalletFace
        onClick={handle(setActiveWallet)(id)}
        renameWallet={ignoreEvent(renameWallet)(id)}
        deleteWallet={ignoreEvent(deleteWallet)(id)}
        backupWallet={isReadOnly ? null : ignoreEvent(backupWallet)(id)}
        title={name}
        iconName={iconName}
        description={isReadOnly ? `${description}, read only` : description}
        isReadOnly={isReadOnly}
        hasActions
      />
    )
  }
}

export default WalletCard
