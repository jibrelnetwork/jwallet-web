// @flow

import React from 'react'

import checkMnemonicType from 'utils/keystore/checkMnemonicType'
import { handle, ignoreEvent } from 'utils/eventHandlers'

import {
  WalletFace,
  WalletActions,
  WalletLoading,
} from 'components'

const WALLET_TYPE_ICON_MAP = {
  'address': 'binding',
  'privateKey': 'binding',
  'bip32Xpub': 'multy',
  'mnemonic': 'multy',
}

type Props = {|
  +renameWallet: (WalletId) => void,
  +backupWallet: (WalletId) => void,
  +deleteWallet: (WalletId) => void,
  +toggleWallet: (WalletId) => void,
  +setActiveWallet: Function,
  +walletData: Wallet,
  +isLoading: boolean,
  +isToggled: boolean,
|}

const WalletCard = ({
  renameWallet,
  backupWallet,
  deleteWallet,
  toggleWallet,
  setActiveWallet,
  walletData,
  isLoading,
  isToggled,
}: Props) => {
  const {
    id,
    name,
    type,
    address,
    customType,
    isReadOnly,
  }: Wallet = walletData

  const isMnemonic: boolean = checkMnemonicType(type)
  const iconName: string = WALLET_TYPE_ICON_MAP[customType]

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

export default WalletCard
