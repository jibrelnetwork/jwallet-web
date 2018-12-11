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

const getSettingsCardProperties = ({
  localCurrencyCode,
  defaultGasPrice,
  systemLanguageCode,
  hasPinCode,
  isFullMnemonic,
  networkName,
  walletName,
  derivationPath,
  passphrase,
}): {...SettingsGridCardProps, searchTags: string}[] => [{
  title: 'Local currency',
  description: formatCurrency(localCurrencyCode),
  path: 'settings/currency',
  iconName: 'local-currency',
  searchTags: '',
}, {
  title: 'Default GAS Price',
  description: divideThousands(defaultGasPrice),
  path: 'settings/gas-price',
  iconName: 'time',
  searchTags: '',
}, {
  title: 'System language',
  description: formatLanguage(systemLanguageCode),
  path: 'settings/language',
  iconName: 'language',
  searchTags: 'locale translation',
}, {
  title: 'PIN Code',
  description: formatBoolean(hasPinCode),
  path: 'settings/pin-code',
  iconName: 'lock-pin',
  searchTags: '',
}, {
  title: 'Security password',
  description: 'Change',
  path: 'settings/password',
  iconName: 'lock-pin',
  searchTags: '',
}, {
  title: 'Exchange service',
  description: 'Try Jcash',
  path: 'https://jcash.network/',
  iconName: 'exchange-service',
  searchTags: '',
}, {
  title: 'Support',
  description: 'Send ticket to support',
  path: 'settings/support',
  iconName: 'message',
  searchTags: '',
}, {
  title: 'Sing a message',
  description: isFullMnemonic ? 'Enable' : ' ',
  path: 'settings/sign',
  iconName: 'message',
  searchTags: '',
}, {
  title: 'Check a signature',
  description: isFullMnemonic ? 'Enable' : ' ',
  path: 'settings/check-signature',
  iconName: 'protect',
  iconColor: 'blue',
  searchTags: '',
}, {
  title: 'Backup wallet',
  description: 'Save your money!',
  path: 'settings/backup',
  iconName: 'backup-wallet',
  searchTags: '',
}, {
  title: 'Network name',
  description: networkName || ' ',
  path: 'settings/network',
  iconName: 'network',
  searchTags: '',
}, {
  title: 'Rename wallet',
  description: walletName,
  path: 'settings/rename',
  iconName: 'backup-wallet',
  searchTags: '',
}, {
  title: 'Derivation path',
  description: isFullMnemonic && derivationPath ? derivationPath : ' ',
  path: 'settings/derivation',
  iconName: 'setting',
  searchTags: '',
}, {
  title: 'Passphrase',
  description: isFullMnemonic && passphrase ? passphrase : ' ',
  path: 'settings/passphrase',
  iconName: 'setting',
  searchTags: '',
}, {
  title: 'Delete wallet',
  description: 'Badaaaah!',
  path: 'settings/delete',
  iconName: 'cross-circle',
  iconColor: 'red',
  searchTags: '',
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
    this.setState({ searchQuery: query.toLowerCase() })
  }

  filterCardByQuery = (query: string): boolean => {
    const queryPattern = new RegExp(`.*${this.state.searchQuery}.*`)

    return queryPattern.test(query.toLowerCase())
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
      const { description, title, searchTags } = elementProps

      if (description === null || description === false) {
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
