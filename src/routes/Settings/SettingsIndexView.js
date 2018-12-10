// @flow

import React, { PureComponent } from 'react'

import { JText, JSearch } from 'components/base'
import { SettingsGrid } from 'components'
import SettingsGridCard from 'components/SettingsGrid/SettingsGridCard'

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
}) => [
  {
    title: 'Local currency',
    description: formatCurrency(localCurrencyCode),
    path: 'settings/currency',
    iconName: 'local-currency',
  },
  {
    title: 'Default GAS Price',
    description: divideThousands(defaultGasPrice),
    path: 'settings/gas-price',
    iconName: 'time',
  },
  {
    title: 'System language',
    description: formatLanguage(systemLanguageCode),
    path: 'settings/language',
    iconName: 'language',
  },
  {
    title: 'PIN Code',
    description: formatBoolean(hasPinCode),
    path: 'settings/pin-code',
    iconName: 'lock-pin',
  },
  {
    title: 'Security password',
    description: 'Change',
    path: 'settings/password',
    iconName: 'lock-pin',
  },
  {
    title: 'Exchange service',
    description: 'Try Jcash',
    path: 'https://jcash.network/',
    iconName: 'exchange-service',
  },
  {
    title: 'Support',
    description: 'Send ticket to support',
    path: 'settings/support',
    iconName: 'message',
  },
  {
    title: 'Sing a message',
    description: isFullMnemonic ? 'Enable' : ' ',
    path: 'settings/sign',
    iconName: 'message',
  },
  {
    title: 'Check a signature',
    description: isFullMnemonic ? 'Enable' : ' ',
    path: 'settings/check-signature',
    iconName: 'protect',
    iconColor: 'blue',
  },
  {
    title: 'Backup wallet',
    description: 'Save your money!',
    path: 'settings/backup',
    iconName: 'backup-wallet',
  },
  {
    title: 'Network name',
    description: networkName || ' ',
    path: 'settings/network',
    iconName: 'network',
  },
  {
    title: 'Rename wallet',
    description: walletName,
    path: 'settings/rename',
    iconName: 'backup-wallet',
  },
  {
    title: 'Derivation path',
    description: isFullMnemonic && derivationPath ? derivationPath : ' ',
    path: 'settings/derivation',
    iconName: 'setting',
  },
  {
    title: 'Passphrase',
    description: isFullMnemonic && passphrase ? passphrase : ' ',
    path: 'settings/passphrase',
    iconName: 'setting',
  },
  {
    title: 'Delete wallet',
    description: 'Badaaaah!',
    path: 'settings/delete',
    iconName: 'cross-circle',
    iconColor: 'red',
  },
]

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

  filterCardByQuery = (value: string): boolean => {
    const queryPattern = new RegExp(`.*${this.state.searchQuery}.*`)

    return queryPattern.test(value.toLowerCase())
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

    const SettingsCards = getSettingsCardProperties({
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
      const { description, title } = elementProps

      if (description === null || description === false) {
        return false
      }
      if (!this.filterCardByQuery(description) && !this.filterCardByQuery(title)) {
        return false
      }

      return elementProps
    }).map(properties => <SettingsGridCard key={properties.path} {...properties} />)

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
              {SettingsCards}
            </SettingsGrid>
          </div>
        </main>
      </div>
    )
  }
}

export default SettingsIndexView
