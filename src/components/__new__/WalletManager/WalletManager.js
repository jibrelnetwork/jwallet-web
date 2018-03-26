// TODO: Replace info view with KeyButton component

/* @flow */

import React from 'react'

import { JText, JIcon, JButton } from 'components/base/__new__'

import Info from './WalletManagerInfo'
import Actions from './WalletManagerActions'
import Password from './WalletManagerPassword'

const walletTypeIconMap = {
  'address': 'private-key-read',
  'privateKey': 'private-key',
  'bip32Xpub': 'mnemonic-read',
  'mnemonic': 'mnemonic',
}

const WalletManager = ({
  toggleWallet,
  showActionsMenu,
  setWalletAction,
  setPassword,
  setActive,
  walletData,
  invalidFields,
  password,
  toggledWalletId,
  showActionsWalletId,
}: Props) => {
  const { id, customType, isReadOnly }: Wallet = walletData
  const icon = walletTypeIconMap[customType]
  const isToggled: boolean = (id === toggledWalletId)
  const isActionsMenuShown: boolean = (id === showActionsWalletId)

  if (isToggled && !isReadOnly) {
    return (
      <div className='WalletManager'>
        <Password
          setPassword={setPassword}
          setActive={setActive}
          invalidFields={invalidFields}
          password={password}
          icon={icon}
        />
      </div>
    )
  }

  if (isActionsMenuShown) {
    return (
      <div className='WalletManager'>
        <Actions setWalletAction={setWalletAction} isReadOnly={isReadOnly} />
      </div>
    )
  }

  return (
    <div className='WalletManager'>
      <Info
        toggleWallet={toggleWallet}
        showActionsMenu={showActionsMenu}
        walletData={walletData}
        icon={icon}
      />
    </div>
  )
}

type Props = {
  toggleWallet: (walletId: WalletId) => Dispatch,
  showActionsMenu: (walletId: WalletId) => Dispatch,
  setWalletAction: (walletAction: WalletAction) => Dispatch,
  setPassword: (password: Password) => Dispatch,
  setActive: () => Dispatch,
  walletData: Wallet,
  invalidFields: Object,
  password: Password,
  toggledWalletId: ?WalletId,
  showActionsWalletId: ?WalletId,
}

export default WalletManager
