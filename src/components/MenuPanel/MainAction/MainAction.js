// @flow

import React from 'react'
import { t } from 'ttag'
import { Link } from 'react-router'
import classnames from 'classnames'

import checkMnemonicType from 'utils/wallets/checkMnemonicType'

import jRaisedButtonStyle from 'components/base/JRaisedButton/jRaisedButton.m.scss'

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
      <div className='main-action'>
        <Link
          className={classnames(jRaisedButtonStyle.core, jRaisedButtonStyle.gray)}
          to='/upgrade'
        >{t`Add private key`}
        </Link>
      </div>
    )
  }

  if (isReadOnly && isMnemonic) {
    return (
      <div className='main-action'>
        <Link
          className={classnames(jRaisedButtonStyle.core, jRaisedButtonStyle.white)}
          to='/upgrade'
        >{t`Add mnemonic`}
        </Link>
      </div>
    )
  }

  return (
    <div className='main-action'>
      <Link
        className={classnames(jRaisedButtonStyle.core, jRaisedButtonStyle.white)}
        to='/digital-assets/send'
      >{t`Send asset`}
      </Link>
    </div>
  )
}

export default MenuPanelMainAction
