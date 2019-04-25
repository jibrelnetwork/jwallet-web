// @flow strict

import React, {
  Component,
} from 'react'
import { t } from 'ttag'

// import escapeRegExp from 'utils/regexp/escapeRegExp'
// import getDigitalAssetByAddress from 'utils/digitalAssets/getDigitalAssetByAddress'

import {
  JPickerBody,
  JPickerList,
  JPickerCurrent,
  NotFoundItem,
} from 'components/base/JPicker'
// import {
// // formatAssetBalance,
// // formatCurrencyWithSymbol,
// } from 'utils/formatters'

import {
  Tabs,
  type Tab,
} from './Tabs/Tabs'
import { Empty } from './Tabs/Empty'

// import { JAssetSymbol } from 'components/base'

// import { AssetBalance } from './AssetBalance/AssetBalance'
// import { AssetItem } from './Item/AssetItem'

// function searchDigitalAssets(
//   digitalAssets: DigitalAssetWithBalance[],
//   searchQuery: string,
// ): DigitalAssetWithBalance[] {
//   const query: string = searchQuery.trim()
//   const searchRe: RegExp = new RegExp(escapeRegExp(query), 'ig')

//   return !query ? digitalAssets : digitalAssets.reduce((
//     result: DigitalAssetWithBalance[],
//     asset: DigitalAssetWithBalance,
//   ): DigitalAssetWithBalance[] => {
//     const {
//       name,
//       symbol,
//       blockchainParams: {
//         address,
//       },
//     }: DigitalAssetWithBalance = asset

//     const isFound: boolean = (
//       (name.search(searchRe) !== -1) ||
//       (symbol.search(searchRe) !== -1) ||
//       (address.search(searchRe) !== -1)
//     )

//     return !isFound ? result : [
//       ...result,
//       asset,
//     ]
//   }, [])
// }

type Contact = {|
  +name?: string,
  +description?: string,
  +address: Address,
|}

type Props = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
  // +fiatCurrency: FiatCurrency,
  +contacts: Contact[],
  +wallets: Wallet[],
|}

type ComponentSatte = {|
  searchQuery: string,
  activeTab: Tab,
|}

class RecipientPicker extends Component<Props, ComponentSatte> {
  static defaultProps = {
    fiatCurrency: 'USD',
  }

  state = {
    searchQuery: '',
    activeTab: 'contacts',
  }

  handleSearchQueryChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value })
  }

  handleOpen = () => {
    this.setState({ searchQuery: '' })
    this.props.input.onFocus()
  }

  handleClose = () => {
    this.setState({ searchQuery: '' })
    this.props.input.onBlur()
  }

  handleTabClick = (activeTab: Tab) => {
    this.setState({ activeTab })
  }

  renderContactsTab = () => {
    const {
      input,
      contacts,
      // fiatCurrency,
    } = this.props

    if (!contacts.length) {
      return (
        <Empty tab='contacts' />
      )
    }

    const activeContact = contacts.find(contact => contact.id === input.value)
    const filteredContacts = contacts

    if (!filteredContacts.length) {
      return (
        <NotFoundItem />
      )
    }

    return (
      <JPickerList
      // eslint-disable-next-line react/jsx-handler-names
        onItemClick={input.onChange}
        activeItemKey={activeContact ? activeContact.id : ''}
      >
        {filteredContacts.map(contact => (
          <span key={contact.id} />
        ))}
      </JPickerList>
    )
  }

  renderWalletsTab = () => {
    const {
      input,
      wallets,
      // fiatCurrency,
    } = this.props

    if (!wallets.length) {
      return (
        <Empty tab='wallets' />
      )
    }

    const activeWallet = wallets.find(wallet => wallet.id === input.value)
    const filteredWallets = wallets

    if (!filteredWallets.length) {
      return (
        <NotFoundItem />
      )
    }

    return (
      <JPickerList
      // eslint-disable-next-line react/jsx-handler-names
        onItemClick={input.onChange}
        activeItemKey={activeWallet ? activeWallet.id : ''}
      >
        {filteredWallets.map(wallet => (
          <span key={wallet.id} />
        ))}
      </JPickerList>
    )
  }

  render() {
    const {
      meta,
      // wallets,
      // contacts,
      // input,
      // fiatCurrency,
    } = this.props

    const {
      searchQuery,
      activeTab,
    } = this.state

    const currentValue = ''

    // const isWalletsAndContactsEmpty = (!wallets.length && !contacts.length)

    return (
      <JPickerBody
        isOpen={meta.active || false}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        currentRenderer={({ isOpen }) => (
          <JPickerCurrent
            isEditable={isOpen}
            label={t`Recipient`}
            value={currentValue}
            inputValue={searchQuery}
            onInputChange={this.handleSearchQueryChange}
            iconRenderer={() => (
              <span />
            )}
          />
        )}
      >
        <Tabs
          activeTab={activeTab}
          onTabClick={this.handleTabClick}
        />
        {activeTab === 'contacts' ? this.renderContactsTab() : this.renderWalletsTab()}
        {/* {!filteredDigitalAssets.length
          ? (
            <NotFoundItem />
          )
          : (
            <JPickerList
            // eslint-disable-next-line react/jsx-handler-names
              onItemClick={input.onChange}
              activeItemKey={activeAssetAddress}
            >
              {filteredDigitalAssets.map((item: DigitalAssetWithBalance) => {
                const {
                  name,
                  balance,
                  blockchainParams: {
                    address,
                    decimals,
                  },
                } = item

                const symbol = item.symbol.toUpperCase()

                const formattedAssetBalance = balance && balance.value
                  ? `${formatAssetBalance(address, balance.value, decimals)} ${symbol}`
                  : ''

                const formattedFiatBalance = balance && balance.fiatBalance
                  ? `=${formatCurrencyWithSymbol(balance.fiatBalance, fiatCurrency)}`
                  : ''

                return (
                  <AssetItem
                    key={address}
                    name={name}
                    symbol={symbol}
                    address={address}
                    assetBalance={formattedAssetBalance}
                    fiatBalance={formattedFiatBalance}
                  />
                )
              })}
            </JPickerList>
          )
        } */}
      </JPickerBody>
    )
  }
}

export { RecipientPicker }
