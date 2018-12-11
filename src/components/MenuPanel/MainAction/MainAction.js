// @flow

import React from 'react'

import JRaisedButton from 'components/base/JRaisedButton'
import checkMnemonicType from 'utils/wallets/checkMnemonicType'

type Props = {|
  +onSendAssetClick: () => void,
  +isReadOnly: boolean,
  +type: WalletType,
|}

function MenuPanelMainAction({ isReadOnly, type, onSendAssetClick }: Props) {
  const readOnlyLabel: string = checkMnemonicType(type) ? 'Add mnemonic' : 'Add private key'

  return (
    <div className='menu-panel-main-action'>
      <JRaisedButton
        onClick={onSendAssetClick}
        labelColor={isReadOnly ? 'dark' : 'blue'}
        label={isReadOnly ? readOnlyLabel : 'Send asset'}
        color='white'
      />
    </div>
  )
}

export default MenuPanelMainAction
