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
import {
  getAddressName,
  startsWithOrEndsWith,
  checkAddressPartValid,
} from 'utils/address'

import { Empty } from './Tabs/Empty'
import { ContactItem } from './ContactItem/ContactItem'
import { ContactIcon } from './ContactIcon/ContactIcon'
import { WalletList } from './WalletList/WalletList'
import { QuickSendItem } from './QuickSendItem/QuickSendItem'
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

    const isFound: boolean =
      (name && searchRe.test(name)) ||
      (description && searchRe.test(description)) ||
      startsWithOrEndsWith(address, query)

    return !isFound ? result : [
      ...result,
      contact,
    ]
  }, [])
}

function filterWallets(wallets: RecipientPickerWallet[], searchQuery: string) {
  if (!searchQuery) {
    return wallets
  }

  const searchRe: RegExp = new RegExp(escapeRegExp(searchQuery), 'ig')

  return wallets.map((wallet) => {
    if (searchRe.test(wallet.name || '')) {
      return wallet
    }

    // filter addresses
    const addresses = wallet.addresses.filter((addr, index) =>
      searchRe.test(getAddressName(addr.name, index)) ||
      startsWithOrEndsWith(addr.address, searchQuery))

    if (addresses.length) {
      return {
        ...wallet,
        addresses,
      }
    }

    return null
  }).filter(Boolean)
}

export type Props = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
  +contacts: Contact[],
  +wallets: RecipientPickerWallet[],
  +className: string,
  // fiatCurrency: FiatCurrency,
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

type SearchInputRef = {
  current: null | HTMLInputElement,
}

class RecipientPicker extends Component<Props, ComponentState> {
  static defaultProps = {
    className: '',
  }

  state = {
    searchQuery: '',
    activeTab: 'contacts',
    openWallets: [],
  }

  searchInputRef: SearchInputRef = React.createRef()

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
          ref={this.searchInputRef}
          isEditable={isOpen}
          label={t`Recipient`}
          value={!isOpen ? title : ''}
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
        ? `${activeWallet.name} / ${getAddressName(activeAddress.name, activeAddressIndex)}`
        : activeWallet.name

      return (
        <JPickerCurrent
          ref={this.searchInputRef}
          isEditable={isOpen}
          label={t`Recipient`}
          value={!isOpen ? title : ''}
          inputValue={searchQuery}
          onInputChange={this.handleSearchQueryChange}
          iconRenderer={() => (
            <JIcon name='0x-use-fill' color='blue' />
          )}
        />
      )
    } else if (activeWallet) {
      return (
        <JPickerCurrent
          ref={this.searchInputRef}
          isEditable={isOpen}
          label={t`Recipient`}
          value={!isOpen ? activeWallet.name : ''}
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
        ref={this.searchInputRef}
        isEditable={isOpen}
        label={t`Recipient`}
        value={!isOpen ? input.value : ''}
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
    this.props.input.onFocus()

    this.setState({ searchQuery: '' }, () => {
      if (this.searchInputRef.current) {
        this.searchInputRef.current.focus()
      }
    })
  }

  handleClose = () => {
    this.setState({ searchQuery: '' })
    this.props.input.onBlur()
  }

  handleTabClick = (activeTab: Tab) => {
    this.setState({ activeTab }, () => {
      if (this.searchInputRef.current) {
        this.searchInputRef.current.focus()
      }
    })
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

    const { searchQuery } = this.state

    const activeContact = contacts.find(contact => contact.address === input.value)
    const filteredContacts = filterContacts(contacts, searchQuery)

    if (!filteredContacts.length) {
      if (checkAddressPartValid(searchQuery)) {
        return (
          <QuickSendItem
            address={searchQuery}
            // eslint-disable-next-line react/jsx-handler-names
            onChange={input.onChange}
          />
        )
      } else {
        return (
          <NotFoundItem />
        )
      }
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
      if (checkAddressPartValid(searchQuery)) {
        return (
          <QuickSendItem
            address={searchQuery}
            // eslint-disable-next-line react/jsx-handler-names
            onChange={input.onChange}
          />
        )
      } else {
        return (
          <NotFoundItem />
        )
      }
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
      className,
    } = this.props

    const {
      activeTab,
    } = this.state

    const isOpen = meta.active || false

    return (
      <JPickerBody
        className={className}
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
