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
  +toggleWallet: (WalletId) => void,
  +renameWallet: (WalletId) => void,
  // +setActiveWallet: Function,
  +walletData: Wallet,
  +toggledWalletId: ?WalletId,
  +isLoading: boolean,
|}

const WalletCard = ({
  renameWallet,
  toggleWallet,
  walletData,
  toggledWalletId,
  isLoading,
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
  const isToggled: boolean = (id === toggledWalletId)
  const iconName: string = WALLET_TYPE_ICON_MAP[customType]

  if (isToggled) {
    return <WalletActions renameWallet={handle(renameWallet)(toggledWalletId)} />
  }

  if (isLoading) {
    return <WalletLoading />
  }

  const description: string = (!isMnemonic && address)
    ? `${address.substr(0, 15)}...${address.substr(-6)}`
    : 'Mnemonic, many addresses'

  return (
    <WalletFace
      onClick={console.log/* handle(setActiveWallet)(id) */}
      showActions={ignoreEvent(toggleWallet)(id)}
      title={name}
      iconName={iconName}
      description={isReadOnly ? `${description}, read only` : description}
      isReadOnly={isReadOnly}
    />
  )
}

export default WalletCard
