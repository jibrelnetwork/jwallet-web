// @flow

import React, { PureComponent } from 'react'
import { t } from 'ttag'
import { Scrollbars } from 'react-custom-scrollbars'

import SettingsGrid from 'components/SettingsGrid'
import escapeRegExp from 'utils/regexp/escapeRegExp'
import formatCurrency from 'utils/formatters/formatCurrency'

import {
  JText,
  JSearch,
} from 'components/base'

import SettingsGridCard, {
  type SettingsGridCardProps,
} from 'components/SettingsGrid/SettingsGridCard'

type Props = {|
  ...SettingsState,
  +wallet: ?Wallet,
  +networkName: ?string,
  +fiatCurrency: FiatCurrency,
|}

type ComponentState = {|
  +searchQuery: string,
|}

// eslint-disable-next-line max-len
const JCASH_UTM_URL = 'https://jcash.network?utm_source=jwallet&utm_medium=internal_link&utm_campaign=jibrel_projects_promo&utm_content=exchange_try_jcash'

// Looks scary, but it's just declaration of settings
const getSettingsCardProperties = ({
  walletId,
  walletName,
  fiatCurrency,
}): {...SettingsGridCardProps, searchTags: string, isVisible: boolean}[] => [{
  title: t`Local currency`,
  description: formatCurrency(fiatCurrency),
  path: '/settings/currency',
  iconName: 'local-currency',
  searchTags: '',
  isVisible: true,
}, {
  title: t`Payment password`,
  description: t`Change`,
  path: '/settings/security-password',
  iconName: 'lock-pin',
  searchTags: '',
  isVisible: true,
}, {
  title: t`Exchange service`,
  description: t`Try Jcash`,
  path: JCASH_UTM_URL,
  iconName: 'exchange-service-use-fill',
  searchTags: '',
  isVisible: true,
}, {
  title: t`Support`,
  description: t`Check out Jwallet on Zendesk`,
  path: 'https://jibrel.zendesk.com/hc/en-us/categories/360001171933-Jibrel-Wallet-Jwallet-',
  iconName: 'message',
  searchTags: 'zendesk help',
  isVisible: true,
}, {
  title: t`Rename wallet`,
  description: walletName,
  path: `/wallets/${walletId}/rename`,
  iconName: 'edit-pen',
  searchTags: '',
  isVisible: true,
}, {
  title: t`Delete wallet`,
  description: t`Don't forget to back it up!`,
  path: `/wallets/${walletId}/delete`,
  iconName: 'cross-circle',
  iconColor: 'red',
  searchTags: '',
  isVisible: true,
}]

class SettingsIndexView extends PureComponent<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      searchQuery: '',
    }
  }

  handleChange = (query: string): void => {
    this.setState({ searchQuery: query.trim() })
  }

  filterCardByQuery = (query: string): boolean => {
    const queryPattern = new RegExp(escapeRegExp(this.state.searchQuery), 'ig')

    return queryPattern.test(query)
  }

  render() {
    const {
      wallet,
      networkName,
      fiatCurrency,
      systemLanguageCode,
      hasPinCode,
    } = this.props

    if (!networkName || !wallet) {
      return null
    }

    const {
      customType,
      isReadOnly,
      mnemonicOptions,
      id: walletId,
      name: walletName,
    } = wallet

    const isFullMnemonic = (customType === 'mnemonic') && !isReadOnly
    const derivationPath = mnemonicOptions ? mnemonicOptions.derivationPath : null
    const passphrase = mnemonicOptions ? mnemonicOptions.passphrase : null

    const settingsCards = getSettingsCardProperties({
      isReadOnly,
      fiatCurrency,
      systemLanguageCode,
      hasPinCode,
      walletName,
      walletId,
      networkName,
      isFullMnemonic,
      derivationPath,
      passphrase,
    }).filter((elementProps) => {
      const {
        searchTags,
        title,
        description,
        isVisible,
      } = elementProps

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
                  onChange={this.handleChange}
                  placeholder={t`Search settings...`}
                />
              </div>
            </div>
          </div>
        </header>
        <main className='content'>
          <Scrollbars autoHide>
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
          </Scrollbars>
        </main>
      </div>
    )
  }
}

export default SettingsIndexView
