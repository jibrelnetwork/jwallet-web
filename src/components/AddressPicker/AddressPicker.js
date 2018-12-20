// @flow

import React, { Component } from 'react'
import checkAddressValid from 'utils/wallets/checkAddressValid'

import JPicker, { JPickerFullItem } from 'components/base/JPicker'

import Current from './Current/AddressPickerCurrent'

type Props = {|
  addresses: Array<AddressPickerAddress>,
  selectedAddress: Address,
  onSelect: (address: Address) => void,
  isDisabled: boolean,
  errorMessage: string,
|}

type ComponentState = {|
  filter: string,
|}

class AddressPicker extends Component<Props, ComponentState> {
  static defaultProps = {
    addresses: [],
    isDisabled: false,
    errorMessage: '',
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      filter: '',
    }
  }

  onFilterChange = (filter: string) => {
    this.setState({ filter }, () => {
      if (checkAddressValid(filter)) {
        this.props.onSelect(filter)
      }
    })
  }

  onOpen = () => {
    // reset filter
    this.setState({ filter: '' })
  }

  render() {
    const {
      addresses,
      selectedAddress,
      onSelect,
      isDisabled,
      errorMessage,
    } = this.props

    const {
      filter,
    } = this.state

    const activeAddress = addresses.find(({ address }) => address === selectedAddress)

    const filterStr = filter.trim().toLowerCase()
    const filtered = filterStr
      ? addresses.filter(({ address, title }) =>
        address.toLowerCase() === filterStr ||
          title.toLowerCase().indexOf(filterStr) !== -1
      )
      : addresses

    return (
      <div className='address-picker'>
        <JPicker
          errorMessage={errorMessage}
          isDisabled={isDisabled}
          onOpen={this.onOpen}
          currentRenderer={({ isOpen }) => (
            <Current
              isOpen={isOpen}
              filterChange={this.onFilterChange}
              filterValue={filter}
              address={activeAddress ? activeAddress.address : null}
            />)}
        >
          {filtered.map(address => (
            <JPickerFullItem
              key={address.address}
              value={address.address}
              onSelect={onSelect}
              icon=''
              title={address.title}
              description={address.address}
              isSelected={activeAddress && address.address === activeAddress.address}
            />
          ))}
        </JPicker>
      </div>
    )
  }
}

export default AddressPicker
