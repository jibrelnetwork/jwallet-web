// @flow

import React from 'react'
import { t } from 'ttag'
import classnames from 'classnames'

import checkMnemonicType from 'utils/wallets/checkMnemonicType'
import { JLink } from 'components/base'

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
        <JLink
          className={classnames(jRaisedButtonStyle.core, jRaisedButtonStyle.gray)}
          href='/upgrade'
        >{t`Add private key`}
        </JLink>
      </div>
    )
  }

  if (isReadOnly && isMnemonic) {
    return (
      <div className='main-action'>
        <JLink
          className={classnames(jRaisedButtonStyle.core, jRaisedButtonStyle.white)}
          href='/upgrade'
        >{t`Add mnemonic`}
        </JLink>
      </div>
    )
  }

  return (
    <div className='main-action'>
      <JLink
        className={classnames(jRaisedButtonStyle.core, jRaisedButtonStyle.white)}
        href='/digital-assets/send'
      >{t`Send asset`}
      </JLink>
    </div>
  )
}

export default MenuPanelMainAction
