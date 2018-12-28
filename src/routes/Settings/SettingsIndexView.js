// @flow

import React, { PureComponent } from 'react'

import { JText, JSearch } from 'components/base'
import { SettingsGrid } from 'components'
import SettingsGridCard,
{ type SettingsGridCardProps } from 'components/SettingsGrid/SettingsGridCard'

import { divideThousands } from 'utils/numbers'
import { formatBoolean, formatCurrency, formatLanguage } from 'utils/formatters'

type Props = {|
  ...SettingsState,
  networkName: ?string,
  wallet: ?Wallet,
|}

// Looks scary, but it's just declaration of settings
const getSettingsCardProperties = ({
  isReadOnly,
  localCurrencyCode,
  defaultGasPrice,
  systemLanguageCode,
  hasPinCode,
  isFullMnemonic,
  networkName,
  walletName,
  derivationPath,
  passphrase,
}): {...SettingsGridCardProps, searchTags: string, isVisible: boolean}[] => [{
  title: 'Local currency',
  description: formatCurrency(localCurrencyCode),
  path: 'settings/currency',
  iconName: 'local-currency',
  searchTags: '',
  isVisible: true,
}, {
  title: 'Default GAS Price',
  description: divideThousands(defaultGasPrice),
  path: 'settings/gas-price',
  iconName: 'time',
  searchTags: '',
  isVisible: true,
}, {
  title: 'System language',
  description: formatLanguage(systemLanguageCode),
  path: 'settings/language',
  iconName: 'language',
  searchTags: 'locale translation',
  isVisible: true,
}, {
  title: 'PIN Code',
  description: formatBoolean(hasPinCode),
  path: 'settings/pin-code',
  iconName: 'lock-pin',
  searchTags: '',
  isVisible: true,
}, {
  title: 'Security password',
  description: 'Change',
  path: 'settings/password',
  iconName: 'lock-pin',
  searchTags: '',
  isVisible: true,
}, {
  title: 'Exchange service',
  description: 'Try Jcash',
  path: 'https://jcash.network/',
  iconName: 'exchange-service',
  searchTags: '',
  isVisible: true,
}, {
  title: 'Support',
  description: 'Send ticket to support',
  path: 'settings/support',
  iconName: 'message',
  searchTags: '',
  isVisible: true,
}, {
  title: 'Sign a message',
  description: isFullMnemonic ? 'Enable' : ' ',
  path: 'settings/sign',
  iconName: 'message',
  searchTags: '',
  isVisible: !isReadOnly,
}, {
  title: 'Check a signature',
  description: isFullMnemonic ? 'Enable' : ' ',
  path: 'settings/check-signature',
  iconName: 'protect',
  iconColor: 'blue',
  searchTags: '',
  isVisible: true,
}, {
  title: 'Backup wallet',
  description: 'Save your money!',
  path: 'settings/backup',
  iconName: 'backup-wallet',
  searchTags: '',
  isVisible: true,
}, {
  title: 'Network name',
  description: networkName || ' ',
  path: 'settings/network',
  iconName: 'network',
  searchTags: '',
  isVisible: Boolean(networkName),
}, {
  title: 'Rename wallet',
  description: walletName,
  path: 'settings/rename',
  iconName: 'backup-wallet',
  searchTags: '',
  isVisible: true,
}, {
  title: 'Derivation path',
  description: isFullMnemonic && derivationPath ? derivationPath : ' ',
  path: 'settings/derivation',
  iconName: 'setting',
  searchTags: '',
  isVisible: isFullMnemonic,
}, {
  title: 'Passphrase',
  description: isFullMnemonic && passphrase ? passphrase : ' ',
  path: 'settings/passphrase',
  iconName: 'setting',
  searchTags: '',
  isVisible: isFullMnemonic,
}, {
  title: 'Delete wallet',
  description: 'Badaaaah!',
  path: 'settings/delete',
  iconName: 'cross-circle',
  iconColor: 'red',
  searchTags: '',
  isVisible: true,
}]

type State = {|
  searchQuery: string
|}

class SettingsIndexView extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      searchQuery: '',
    }
  }

  setSearchQuery = (query: string): void => {
    this.setState({ searchQuery: query.trim() })
  }

  filterCardByQuery = (query: string): boolean => {
    const queryPattern = new RegExp(this.state.searchQuery, 'gi')

    return queryPattern.test(query)
  }

  render() {
    const {
      localCurrencyCode,
      defaultGasPrice,
      systemLanguageCode,
      hasPinCode,
      networkName,
      wallet,
    } = this.props

    if (!networkName || !wallet) {
      return null
    }

    const { name: walletName, customType, isReadOnly, mnemonicOptions } = wallet
    const isFullMnemonic = (customType === 'mnemonic') && !isReadOnly
    const derivationPath = mnemonicOptions ? mnemonicOptions.derivationPath : null
    const passphrase = mnemonicOptions ? mnemonicOptions.passphrase : null

    const settingsCards = getSettingsCardProperties({
      isReadOnly,
      localCurrencyCode,
      defaultGasPrice,
      systemLanguageCode,
      hasPinCode,
      walletName,
      networkName,
      isFullMnemonic,
      derivationPath,
      passphrase,
    }).filter((elementProps) => {
      const { isVisible, description, title, searchTags } = elementProps

      if (!isVisible) {
        return false
      }
      if (!this.filterCardByQuery(description)
        && !this.filterCardByQuery(title)
        && !this.filterCardByQuery(searchTags)) {
        return false
      }

      return elementProps
    })

    return (
      <div className='settings-view'>
        <header className='header'>
          <div className='container'>
            <JText value='Settings' size='tab' color='dark' />
            <div className='actions'>
              <div className='search'>
                <JSearch
                  onChange={this.setSearchQuery}
                  placeholder='Search settings...'
                />
              </div>
            </div>
          </div>
        </header>
        <main className='content'>
          <div className='container'>
            <SettingsGrid>
              {settingsCards.map(properties => (
                <SettingsGridCard
                  key={properties.path}
                  title={properties.title}
                  description={properties.description}
                  path={properties.path}
                  iconName={properties.iconName}
                  iconColor={properties.iconColor}
                />
              ))}
            </SettingsGrid>
          </div>
        </main>
      </div>
    )
  }
}

export default SettingsIndexView
