// @flow

import React from 'react'
import { t } from 'ttag'
import { Link } from 'react-router'

import JRaisedButton from 'components/base/JRaisedButton'
import checkMnemonicType from 'utils/wallets/checkMnemonicType'

type Props = {|
  +isReadOnly: boolean,
  +type: WalletType,
|}

function MenuPanelMainAction({
  type,
  isReadOnly,
}: Props) {
  const isMnemonic = checkMnemonicType(type)

  if (isReadOnly && !isMnemonic) {
    return (
      <Link
        className='menu-panel-main-action'
        to='/upgrade'
      >
        <JRaisedButton
          onClick={null}
          label={t`Add private key`}
          labelColor='dark'
          color='white'
        />
      </Link>
    )
  }

  if (isReadOnly && isMnemonic) {
    return (
      <Link
        className='menu-panel-main-action'
        to='/upgrade'
      >
        <JRaisedButton
          onClick={null}
          label={t`Add mnemonic`}
          labelColor='dark'
          color='white'
        />
      </Link>
    )
  }

  return (
    <Link
      className='menu-panel-main-action'
      to='/digital-assets/send'
    >
      <JRaisedButton
        onClick={null}
        label={t`Send asset`}
        labelColor='blue'
        color='white'
      />
    </Link>
  )
}

export default MenuPanelMainAction
