// @flow

import React from 'react'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'
import checkMnemonicType from 'utils/keystore/checkMnemonicType'

import WalletFace from './WalletFace'
import WalletActions from './WalletActions'

const WALLET_TYPE_ICON_MAP = {
  'address': 'binding',
  'privateKey': 'binding',
  'bip32Xpub': 'multy',
  'mnemonic': 'multy',
}

type Props = {|
  +toggleWallet: Function,
  // +setActiveWallet: Function,
  +walletData: Wallet,
  +toggledWalletId: ?WalletId,
|}

const WalletCard = ({
  toggleWallet,
  walletData,
  toggledWalletId,
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
    return <WalletActions isMnemonic={isMnemonic} />
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
      isTransparent={isReadOnly}
      isEyeIcon={isReadOnly}
    />
  )
}

export default WalletCard
