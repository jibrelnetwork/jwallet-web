// @flow

import React, { Component } from 'react'
import keystore from '@jibrelnetwork/jwallet-web-keystore'

import JPicker, { JPickerItem } from 'components/base/JPicker'

import Current from './Current/AddressPickerCurrent'
import Item from './Item/AddressPickerItem'

export type AddressInfo = {|
  +address: Address,
  +title: string,
|}

type Props = {|
  asset: DigitalAsset,
  addresses: Array<AddressInfo>,
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
      if (keystore.checkAddressValid(filter)) {
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
      asset,
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
            <JPickerItem
              key={address.address}
              onSelect={onSelect}
              value={address.address}
            >
              <Item
                address={address.address}
                title={address.title}
                asset={asset}
                isSelected={activeAddress && address.address === activeAddress.address}
              />
            </JPickerItem>
          ))}
        </JPicker>
      </div>
    )
  }
}

export default AddressPicker
