// @flow

import React from 'react'

import isMnemonicType from 'utils/keystore/isMnemonicType'
import { handle, ignoreEvent } from 'utils/eventHandlers'

import WalletFace from './WalletFace'
import WalletActions from './WalletActions'
import WalletPassword from './WalletPassword'

const walletTypeIconMap = {
  'address': 'private-key-read',
  'privateKey': 'private-key',
  'bip32Xpub': 'mnemonic-read',
  'mnemonic': 'mnemonic',
}

const WalletCard = ({
  setActive,
  setPassword,
  toggleWallet,
  showActionsMenu,
  setWalletAction,
  walletData,
  invalidFields,
  password,
  toggledWalletId,
  showActionsWalletId,
}: Props) => {
  const { id, name, type, address, customType, isReadOnly }: Wallet = walletData
  const isMnemonic: boolean = isMnemonicType(type)
  const isToggled: boolean = (id === toggledWalletId)
  const iconName: string = walletTypeIconMap[customType]
  const isActionsMenuShown: boolean = (id === showActionsWalletId)

  if (isToggled && !isReadOnly) {
    return (
      <WalletPassword
        setActive={setActive}
        setPassword={setPassword}
        iconName={iconName}
        password={password}
        errorMessage={invalidFields.password}
      />
    )
  }

  if (isActionsMenuShown) {
    return <WalletActions setWalletAction={setWalletAction} isReadOnly={isReadOnly} />
  }

  const description: string = (!isMnemonic && address)
    ? `${address.substr(0, 15)}...${address.substr(-6)}`
    : 'Mnemonic'

  return (
    <WalletFace
      onClick={handle(toggleWallet)(id)}
      showActions={ignoreEvent(showActionsMenu)(id)}
      title={name}
      iconName={iconName}
      description={isReadOnly ? `${description}, read only` : description}
    />
  )
}

type Props = {
  setActive: Function,
  setPassword: Function,
  toggleWallet: Function,
  showActionsMenu: Function,
  setWalletAction: Function,
  walletData: Wallet,
  invalidFields: FormFields,
  password: string,
  toggledWalletId: ?WalletId,
  showActionsWalletId: ?WalletId,
}

export default WalletCard
