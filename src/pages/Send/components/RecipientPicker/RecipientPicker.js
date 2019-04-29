// @flow strict

import React, {
  Component,
} from 'react'
import { t } from 'ttag'

import escapeRegExp from 'utils/regexp/escapeRegExp'

import {
  JPickerBody,
  JPickerList,
  JPickerCurrent,
  NotFoundItem,
} from 'components/base/JPicker'

import { Empty } from './Tabs/Empty'
import { ContactItem } from './ContactItem/ContactItem'
import { ContactIcon } from './ContactIcon/ContactIcon'
import { WalletList } from './WalletList/WalletList'
import {
  Tabs,
  type Tab,
} from './Tabs/Tabs'

type Contact = {|
  +name?: string,
  +description?: string,
  +address: Address,
|}

function filterContacts(
  contacts: Contact[],
  searchQuery: string,
): Contact[] {
  const query: string = searchQuery.trim()
  const searchRe: RegExp = new RegExp(escapeRegExp(query), 'ig')

  return !query ? contacts : contacts.reduce((
    result,
    contact,
  ) => {
    const {
      name,
      description,
      address,
    } = contact

    const isFound: boolean = (
      (name && name.search(searchRe) !== -1) ||
      (description && description.search(searchRe) !== -1) ||
      (address.search(searchRe) !== -1)
    )

    return !isFound ? result : [
      ...result,
      contact,
    ]
  }, [])
}

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

  renderContactsTab = (activeContact: Contact) => {
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

    const filteredContacts = filterContacts(contacts, this.state.searchQuery)

    if (!filteredContacts.length) {
      return (
        <NotFoundItem />
      )
    }

    return (
      <JPickerList
      // eslint-disable-next-line react/jsx-handler-names
        onItemClick={input.onChange}
        activeItemKey={activeContact ? activeContact.address : ''}
      >
        {filteredContacts.map(contact => (
          <ContactItem
            key={contact.address}
            name={contact.name}
            description={contact.description}
            address={contact.address}
          />
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
      <WalletList
        wallets={wallets}
        balances={{}}
        onChange={input.onChange}
      />
    )
  }

  render() {
    const {
      meta,
      // wallet,
      contacts,
      input,
      // fiatCurrency,
    } = this.props

    const {
      searchQuery,
      activeTab,
    } = this.state

    const activeContact = contacts.find(contact => contact.address === input.value)
    // const activeWalletInfo = input.value && input.value.walletId
    //   ? input.value
    //   : null

    // const isWalletsAndContactsEmpty = (!wallets.length && !contacts.length)

    const currentValue = activeContact
      ? activeContact.name
        ? activeContact.name
        : activeContact.address
      : ''

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
            iconRenderer={() => activeContact ? (
              <ContactIcon
                {...activeContact}
              />
            ) : (<span />)}
          />
        )}
      >
        <Tabs
          activeTab={activeTab}
          onTabClick={this.handleTabClick}
        />
        {activeTab === 'contacts'
          ? this.renderContactsTab(activeContact)
          : this.renderWalletsTab()}
      </JPickerBody>
    )
  }
}

export { RecipientPicker }
