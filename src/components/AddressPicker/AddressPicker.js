// @flow

import React, { Component } from 'react'

import checkAddressValid from 'utils/wallets/checkAddressValid'
import JPicker, { JPickerFullItem } from 'components/base/JPicker'

import AddressPickerCurrent from './Current'

type Props = {|
  +onSelect: (address: Address) => void,
  +addressNames: AddressNames,
  +errorMessage: string,
  +selectedAddress: Address,
  +isDisabled: boolean,
|}

type ComponentState = {|
  +searchQuery: string,
|}

function filterAddressNames(addressNames: AddressNames, searchQuery: string): AddressNames {
  return !searchQuery ? addressNames : Object.keys(addressNames).reduce((
    result: AddressNames,
    address: Address,
  ): AddressNames => {
    const name: ?string = addressNames[address]

    if (!name) {
      return result
    }

    const isNameFound: boolean = (name.toLowerCase().indexOf(searchQuery) !== -1)
    const isAddressFound: boolean = (address.toLowerCase().indexOf(searchQuery) !== -1)
    const isFound: boolean = (isNameFound || isAddressFound)

    return !isFound ? result : {
      ...result,
      [address]: name,
    }
  }, {})
}

class AddressPicker extends Component<Props, ComponentState> {
  static defaultProps = {
    errorMessage: '',
    isDisabled: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      searchQuery: '',
    }
  }

  changeSearchQuery = (searchQuery: string) => {
    this.setState({ searchQuery }, () => {
      if (checkAddressValid(searchQuery)) {
        this.props.onSelect(searchQuery)
      }
    })
  }

  cleanSearchQuery = () => this.setState({ searchQuery: '' })

  render() {
    const {
      onSelect,
      addressNames,
      selectedAddress,
      errorMessage,
      isDisabled,
    }: Props = this.props

    const { searchQuery }: ComponentState = this.state
    const query: string = searchQuery.trim().toLowerCase()
    const filteredAddressNames: AddressNames = filterAddressNames(addressNames, query)

    return (
      <div className='address-picker'>
        <JPicker
          onOpen={this.cleanSearchQuery}
          currentRenderer={({ isOpen }) => (
            <AddressPickerCurrent
              onChange={this.changeSearchQuery}
              value={selectedAddress}
              searchQuery={searchQuery}
              isOpen={isOpen}
            />
          )}
          errorMessage={errorMessage}
          isDisabled={isDisabled}
        >
          {Object.keys(filteredAddressNames).map((address: Address) => {
            const title: ?string = filteredAddressNames[address]

            if (!title) {
              return null
            }

            return (
              <JPickerFullItem
                key={address}
                onSelect={onSelect}
                title={title}
                value={address}
                description={address}
                icon='padding-binding'
                isSelected={address === selectedAddress}
              />
            )
          })}
        </JPicker>
      </div>
    )
  }
}

export default AddressPicker
