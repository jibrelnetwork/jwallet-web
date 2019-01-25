// @flow

import React, { Component } from 'react'

import checkAddressValid from 'utils/address/checkAddressValid'
import JPicker, { JPickerFullItem } from 'components/base/JPicker'

import AddressPickerCurrent from './Current'

type Props = {|
  +onSelect: (address: Address) => void,
  +addressNames: AddressNames,
  +errorMessage: string,
  +infoMessage: string,
  +selectedAddress: Address,
  +isDisabled: boolean,
|}

type ComponentState = {|
  +searchQuery: string,
|}

function searchAddressNames(addressNames: AddressNames, searchQuery: string): AddressNames {
  const query: string = searchQuery.trim()
  const searchRe: RegExp = new RegExp(query, 'ig')

  return !query ? addressNames : Object.keys(addressNames).reduce((
    result: AddressNames,
    address: Address,
  ): AddressNames => {
    const name: ?string = addressNames[address]

    if (!name) {
      return result
    }

    const isFound: boolean = ((name.search(searchRe) !== -1) || (address.search(searchRe) !== -1))

    return !isFound ? result : {
      ...result,
      [address]: name,
    }
  }, {})
}

class AddressPicker extends Component<Props, ComponentState> {
  static defaultProps = {
    isDisabled: false,
    infoMessage: '',
    errorMessage: '',
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
      infoMessage,
      isDisabled,
    }: Props = this.props

    const { searchQuery }: ComponentState = this.state
    const filteredAddressNames: AddressNames = searchAddressNames(addressNames, searchQuery)

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
          infoMessage={infoMessage}
          isDisabled={isDisabled}
        >
          {Object.keys(filteredAddressNames).map((address: Address) => {
            const name: ?string = filteredAddressNames[address]

            if (!name) {
              return null
            }

            return (
              <JPickerFullItem
                key={address}
                onSelect={onSelect}
                title={name}
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
