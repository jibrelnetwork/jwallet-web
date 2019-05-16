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
import { JIcon } from 'components/base'
import { startsWithOrEndsWith } from 'utils/address'

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

export type RecipientPickerWalletAddress = {|
  address: Address,
  name: string,
  fiatBalance?: string,
|}

export type RecipientPickerWallet = {|
  id: WalletId,
  type: 'address' | 'mnemonic' | 'read-only',
  name: string,
  addresses: RecipientPickerWalletAddress[],
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
      startsWithOrEndsWith(address, query)
    )

    return !isFound ? result : [
      ...result,
      contact,
    ]
  }, [])
}

function getAddressName(address: RecipientWalletAddress, addressIndex: number) {
  return address.name
    ? address.name
    : t`Address ${addressIndex + 1}`
}

function filterWallets(wallets: RecipientPickerWallet[], searchQuery: string) {
  if (!searchQuery) {
    return wallets
  }

  const searchRe: RegExp = new RegExp(escapeRegExp(searchQuery), 'ig')

  return wallets.map((wallet) => {
    if (wallet.name.search(searchRe)) {
      return wallet
    }

    if (wallet.type !== 'mnemonic') {
      return null
    }

    // filter addresses
    const addresses = wallet.addresses.filter((address, index) =>
      getAddressName(address, index).search(searchRe))

    if (addresses.length) {
      return {
        ...wallet,
        addresses,
      }
    }

    return null
  }).filter(Boolean)
}

type Props = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
  // +fiatCurrency: FiatCurrency,
  +contacts: Contact[],
  +wallets: RecipientPickerWallet[],
|}

type ComponentState = {|
  searchQuery: string,
  activeTab: Tab,
  openWallets: string[],
|}

type CurrentRendererInput = {
  // eslint-disable-next-line react/no-unused-prop-types
  +isOpen: boolean,
}

class RecipientPicker extends Component<Props, ComponentState> {
  static defaultProps = {
    fiatCurrency: 'USD',
  }

  state = {
    searchQuery: '',
    activeTab: 'contacts',
    openWallets: [],
  }

  currentRenderer = ({ isOpen }: CurrentRendererInput): React$Node => {
    const {
      input,
      contacts,
      wallets,
    } = this.props

    const { searchQuery } =  this.state

    const activeContact = contacts.find(contact => contact.address === input.value)

    if (activeContact) {
      const title = activeContact.name
        ? activeContact.name
        : activeContact.address

      return (
        <JPickerCurrent
          isEditable={isOpen}
          label={t`Recipient`}
          value={title}
          inputValue={searchQuery}
          onInputChange={this.handleSearchQueryChange}
          iconRenderer={() => (
            <ContactIcon name={activeContact.name} />
          )}
        />
      )
    }

    const activeWallet = wallets.find((wallet) => {
      if (wallet.id === input.value) {
        return true
      }

      if (wallet.addresses.find(walletAddress => walletAddress.address === input.value)) {
        return true
      }

      return false
    })

    if (activeWallet && activeWallet.type === 'mnemonic') {
      const [activeAddress, activeAddressIndex] =
        activeWallet.addresses.reduce((
          result,
          walletAddress,
          index,
        ) => walletAddress.address === input.value
          ? [walletAddress, index]
          : result, [undefined, 0])

      const title = activeAddress
        ? activeAddress.name
          ? `${activeWallet.name} / ${activeAddress.name}`
          : `${activeWallet.name} / Address ${activeAddressIndex + 1}`
        : activeWallet.name

      return (
        <JPickerCurrent
          isEditable={isOpen}
          label={t`Recipient`}
          value={title}
          inputValue={searchQuery}
          onInputChange={this.handleSearchQueryChange}
          iconRenderer={() => (
            <ContactIcon name={activeAddress && activeAddress.name} />
          )}
        />
      )
    } else if (activeWallet) {
      return (
        <JPickerCurrent
          isEditable={isOpen}
          label={t`Recipient`}
          value={activeWallet.name}
          inputValue={searchQuery}
          onInputChange={this.handleSearchQueryChange}
          iconRenderer={() => (
            <JIcon name='wallet-use-fill' color='blue' />
          )}
        />
      )
    }

    return (
      <JPickerCurrent
        isEditable={isOpen}
        label={t`Recipient`}
        value=''
        inputValue={searchQuery}
        onInputChange={this.handleSearchQueryChange}
        iconRenderer={() => (
          <JIcon name='contact-2-use-fill' color={isOpen ? 'blue' : 'gray'} />
        )}
      />
    )
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

  handleMnemonicWalletToggle = (walletId: string) => {
    const { openWallets } = this.state

    if (openWallets.includes(walletId)) {
      this.setState({
        openWallets: openWallets.reduce(
          (res, cur) => (cur === walletId
            ? res
            : [...res, cur]
          ),
          [],
        ),
      })
    } else {
      this.setState({
        openWallets: [
          ...openWallets,
          walletId,
        ],
      })
    }
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

    const activeContact = contacts.find(contact => contact.address === input.value)
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
    } = this.props

    if (!wallets.length) {
      return (
        <Empty tab='wallets' />
      )
    }

    const {
      searchQuery,
    } = this.state

    const filteredWallets = filterWallets(wallets, searchQuery)

    if (!filteredWallets.length) {
      return (
        <NotFoundItem />
      )
    }

    return (
      <WalletList
        openWalletIds={this.state.openWallets}
        onMnemonicWalletToggle={this.handleMnemonicWalletToggle}
        wallets={filteredWallets}
        // eslint-disable-next-line react/jsx-handler-names
        onChange={input.onChange}
        activeWalletAddress={input.value}
        isWalletsForceOpened={!!searchQuery}
      />
    )
  }

  render() {
    const {
      meta,
    } = this.props

    const {
      activeTab,
    } = this.state

    const isOpen = meta.active || false

    return (
      <JPickerBody
        isOpen={isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        currentRenderer={this.currentRenderer}
      >
        <Tabs
          activeTab={activeTab}
          onTabClick={this.handleTabClick}
        />
        {activeTab === 'contacts'
          ? this.renderContactsTab()
          : this.renderWalletsTab()}
      </JPickerBody>
    )
  }
}

export { RecipientPicker }
