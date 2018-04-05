// @flow

import React from 'react'

import JLogo from 'components/base/JLogo'
import { MenuLink, MenuSelect } from 'components'

const Menu = ({
  setNetwork,
  setLanguage,
  networks,
  currentNetwork,
  currentLanguage,
  isWalletReadOnly,
}: Props) => (
  <div className='menu'>
    <div className='logo-wrapper'>
      <JLogo />
    </div>
    <div className='links'>
      <MenuLink path='/funds/send' icon='send' disabled={isWalletReadOnly} />
      <MenuLink path='/funds/receive' icon='receive' />
    </div>
    <div className='selects'>
      <MenuSelect
        setActive={setLanguage}
        options={{ en: 'English', ko: 'Korean', zh: 'Chinese', ja: 'Japanese' }}
        active={currentLanguage}
      />
      <MenuSelect
        setActive={setNetwork}
        options={networks}
        active={currentNetwork}
      />
    </div>
  </div>
)

type Props = {
  setNetwork: Function,
  setLanguage: Function,
  networks: { [NetworkId]: string },
  currentNetwork: ?NetworkId,
  currentLanguage: LanguageCode,
  isWalletReadOnly: boolean,
}

export default Menu
