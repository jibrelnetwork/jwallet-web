// @flow

import React from 'react'

import WalletActions from './WalletActions'
import WalletFace from './WalletFace'
import WalletPassword from './WalletPassword'

const WalletItem = ({
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
  const isToggled: boolean = (id === toggledWalletId)
  const isActionsMenuShown: boolean = (id === showActionsWalletId)

  if (isToggled && !isReadOnly) {
    return (
      <WalletPassword
        setPassword={setPassword}
        setActive={setActive}
        invalidFields={invalidFields}
        password={password}
        walletType={customType}
      />
    )
  }

  if (isActionsMenuShown) {
    return (
      <WalletActions
        setWalletAction={setWalletAction}
        isReadOnly={isReadOnly}
      />
    )
  }

  return (
    <WalletFace
      toggleWallet={toggleWallet}
      showActionsMenu={showActionsMenu}
      walletData={walletData}
    />
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

export default WalletItem
