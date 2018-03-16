// @flow

import React from 'react'

import JLogo from 'components/base/__new__/JLogo'
import { MenuLink, MenuSelect } from 'components/__new__'

const Menu = ({
  setNetwork,
  setLanguage,
  networks,
  currentNetwork,
  currentLanguage,
}: Props) => (
  <div className='menu'>
    <JLogo />
    <div className='links'>
      <MenuLink path='/funds/send' icon='send' />
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
}

export default Menu
