// @flow

import React, { PureComponent } from 'react'

import { JText } from 'components/base'
import { SettingsGrid, SettingsCard } from 'components'

import { divideThousands } from 'utils/numbers'
import { formatBoolean, formatCurrency, formatLanguage } from './utils'

type Props = {|
  ...SettingsState,
  +networkName: string,
  +walletType: WalletType,
  +walletName: string,
  +derivationPath: string,
  +passphrase: string,
|}

class SettingsIndexView extends PureComponent<Props, *> {
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
                description={formatCurrency(localCurrencyCode)}
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
                description={formatLanguage(systemLanguageCode)}
                path='settings/language'
                iconName='language'
                iconColor='blue'
              />
              <SettingsCard
                title='PIN Code'
                description={formatBoolean(isPinCode)}
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
                description={formatBoolean(isExchangeService)}
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
                description={formatBoolean(isSignMessage)}
                path='settings/sign'
                iconName='message'
                iconColor='blue'
              />
              <SettingsCard
                title='Check a signature'
                description={formatBoolean(isCheckingSignature)}
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
