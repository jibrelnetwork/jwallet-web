// @flow

import React from 'react'
import { JLogo } from 'react-components'

import MenuLink from './Link'
import MenuSelect from './Select'

const MenuPanel = ({
  setNetwork,
  setLanguage,
  toggleSelect,
  networks,
  activeSelect,
  currentNetwork,
  currentLanguage,
  isWalletReadOnly,
}: Props) => (
  <div className='menu-panel'>
    <div className='logo'>
      <JLogo />
    </div>
    <div className='links'>
      <MenuLink path='/funds/send' icon='send' disabled={isWalletReadOnly} />
      <MenuLink path='/funds/receive' icon='receive' />
    </div>
    <div className='selects'>
      <MenuSelect
        toggle={toggleSelect}
        setActive={setLanguage}
        options={{ en: 'English', ko: 'Korean', zh: 'Chinese', ja: 'Japanese' }}
        active={currentLanguage}
        name='language'
        isOpen={(activeSelect === 'language')}
      />
      <MenuSelect
        toggle={toggleSelect}
        setActive={setNetwork}
        options={networks}
        active={currentNetwork}
        name='network'
        isOpen={(activeSelect === 'network')}
      />
    </div>
  </div>
)

type Props = {
  setNetwork: Function,
  setLanguage: Function,
  toggleSelect: Function,
  networks: { [NetworkId]: string },
  activeSelect: ?string,
  currentNetwork: ?NetworkId,
  currentLanguage: LanguageCode,
  isWalletReadOnly: boolean,
}

MenuPanel.defaultProps = {
  setNetwork: () => {},
  setLanguage: () => {},
  toggleSelect: () => {},
  networks: {},
  activeSelect: null,
  currentNetwork: null,
  currentLanguage: 'en-US',
  isWalletReadOnly: true,
}

export default MenuPanel
