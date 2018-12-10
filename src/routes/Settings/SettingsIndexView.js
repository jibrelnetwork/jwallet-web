// @flow

import React, { PureComponent } from 'react'

import { JText } from 'components/base'
import { SettingsGrid } from 'components'
import SettingsGridCard from 'components/SettingsGrid/SettingsGridCard'

import { divideThousands } from 'utils/numbers'
import { formatBoolean, formatCurrency, formatLanguage } from './utils'

type Props = {|
  ...SettingsState,
  networkName: ?string,
  wallet: ?Wallet,
|}

class SettingsIndexView extends PureComponent<Props, *> {
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
              <SettingsGridCard
                title='Local currency'
                description={formatCurrency(localCurrencyCode)}
                path='settings/currency'
                iconName='local-currency'
                iconColor='blue'
              />
              <SettingsGridCard
                title='Default GAS Price'
                description={divideThousands(defaultGasPrice)}
                path='settings/gas-price'
                iconName='time'
                iconColor='blue'
              />
              <SettingsGridCard
                title='System language'
                description={formatLanguage(systemLanguageCode)}
                path='settings/language'
                iconName='language'
                iconColor='blue'
              />
              <SettingsGridCard
                title='PIN Code'
                description={formatBoolean(hasPinCode)}
                path='settings/pin-code'
                iconName='lock-pin'
                iconColor='blue'
              />
              <SettingsGridCard
                title='Security password'
                description='Change'
                path='settings/password'
                iconName='lock-pin'
                iconColor='blue'
              />
              <SettingsGridCard
                title='Exchange service'
                description='Try Jcash'
                path='https://jcash.network/'
                iconName='exchange-service'
                iconColor='blue'
              />
              <SettingsGridCard
                title='Support'
                description='Send ticket to support'
                path='settings/support'
                iconName='message'
                iconColor='blue'
              />
              {isFullMnemonic ? <SettingsGridCard
                title='Sing a message'
                description='Enable'
                path='settings/sign'
                iconName='message'
                iconColor='blue'
              /> : null}
              {isFullMnemonic ? <SettingsGridCard
                title='Check a signature'
                description='Enable'
                path='settings/check-signature'
                iconName='protect'
                iconColor='blue'
              /> : null}
              <SettingsGridCard
                title='Backup wallet'
                description='Save your money!'
                path='settings/backup'
                iconName='backup-wallet'
                iconColor='blue'
              />
              <SettingsGridCard
                title='Network name'
                description={networkName || ' '}
                path='settings/network'
                iconName='network'
                iconColor='blue'
              />
              <SettingsGridCard
                title='Rename wallet'
                description={walletName}
                path='settings/rename'
                iconName='backup-wallet'
                iconColor='blue'
              />
              {isFullMnemonic ? <SettingsGridCard
                key='derivationPath'
                title='Derivation path'
                description={derivationPath || ' '}
                path='settings/derivation'
                iconName='setting'
                iconColor='blue'
              /> : null}
              {isFullMnemonic ? <SettingsGridCard
                key='passphrase'
                title='Passphrase'
                description={passphrase || ' '}
                path='settings/passphrase'
                iconName='setting'
                iconColor='blue'
              /> : null}
              <SettingsGridCard
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
