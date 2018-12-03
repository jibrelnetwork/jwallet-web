// @flow

import React, { PureComponent } from 'react'

import { JText } from 'components/base'
import { SettingsGrid, SettingsCard } from 'components'

import { divideThousands } from 'utils/numbers'

type Props = {|
  ...SettingsState,
  +networkName: string,
  +walletType: WalletType,
  +walletName: string,
  +derivationPath: string,
  +passphrase: string,
|}

class SettingsIndexView extends PureComponent<Props, *> {
  formatBoolean = (value: boolean): string => value ? 'Enabled' : 'Disabled'

  formatLanguage = (langCode: string): string => {
    const languageMap = {
      en: 'English',
      kr: 'Korean',
    }

    return languageMap[langCode] || 'Language not found'
  }

  formatCurrency = (curCode: string): string => {
    const currencyCode = {
      usd: 'US Dollar',
      rub: 'Russian Ruble',
    }

    return currencyCode[curCode.toLowerCase()] || 'Currency not found'
  }

  render() {
    const {
      localCurrencyCode,
      defaultGasPrice,
      systemLanguageCode,
      isPinCode,
      isExchangeService,
      isSignMessage,
      isCheckingSignature,
      networkName,
      walletType,
      walletName,
      derivationPath,
      passphrase,
    } = this.props

    return (
      <div className='settings-view'>
        <header className='header'>
          <div className='container'>
            <JText value='Settings' size='tab' color='dark' />
          </div>
        </header>
        <main className='content'>
          <div className='container'>
            <SettingsGrid>
              <SettingsCard
                title='Local currency'
                description={this.formatCurrency(localCurrencyCode)}
                path='settings/currency'
                iconName='local-currency'
                iconColor='blue'
              />
              <SettingsCard
                title='Default GAS Price'
                description={divideThousands(defaultGasPrice)}
                path='settings/gas-price'
                iconName='time'
                iconColor='blue'
              />
              <SettingsCard
                title='System language'
                description={this.formatLanguage(systemLanguageCode)}
                path='settings/language'
                iconName='language'
                iconColor='blue'
              />
              <SettingsCard
                title='PIN Code'
                description={this.formatBoolean(isPinCode)}
                path='settings/pin-code'
                iconName='lock-pin'
                iconColor='blue'
              />
              <SettingsCard
                title='Security password'
                description='Change'
                path='settings/password'
                iconName='lock-pin'
                iconColor='blue'
              />
              <SettingsCard
                title='Exchange service'
                description={this.formatBoolean(isExchangeService)}
                path='settings/exchange'
                iconName='exchange-service'
                iconColor='blue'
              />
              <SettingsCard
                title='Support'
                description='Send ticket to support'
                path='settings/support'
                iconName='message'
                iconColor='blue'
              />
              <SettingsCard
                title='Sing a message'
                description={this.formatBoolean(isSignMessage)}
                path='settings/sign'
                iconName='message'
                iconColor='blue'
              />
              <SettingsCard
                title='Check a signature'
                description={this.formatBoolean(isCheckingSignature)}
                path='settings/check-signature'
                iconName='protect'
                iconColor='blue'
              />
              <SettingsCard
                title='Backup wallet'
                description='Save your money!'
                path='settings/backup'
                iconName='backup-wallet'
                iconColor='blue'
              />
              <SettingsCard
                title='Network name'
                description={networkName}
                path='settings/network'
                iconName='network'
                iconColor='blue'
              />
              <SettingsCard
                title='Rename wallet'
                description={walletName}
                path='settings/rename'
                iconName='backup-wallet'
                iconColor='blue'
              />
              {walletType === 'mnemonic' && [
                <SettingsCard
                  key='derivationPath'
                  title='Derivation path'
                  description={derivationPath}
                  path='settings/derivation'
                  iconName='setting'
                  iconColor='blue'
                />,
                <SettingsCard
                  key='passphrase'
                  title='Passphrase'
                  description={passphrase || ' '}
                  path='settings/passphrase'
                  iconName='setting'
                  iconColor='blue'
                />,
              ]}
              <SettingsCard
                title='Delete wallet'
                description='Badaaaah!'
                path='settings/delete'
                iconName='cross-circle'
                iconColor='red'
              />
            </SettingsGrid>
          </div>
        </main>
      </div>
    )
  }
}

export default SettingsIndexView
