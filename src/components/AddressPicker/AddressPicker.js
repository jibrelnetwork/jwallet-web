// @flow strict

import React from 'react'

import JIcon from 'components/base/JIcon'
import WalletAddressItem from 'components/WalletAddressItem'
import getShortenedAddress from 'utils/address/getShortenedAddress'

import {
  JPickerBody,
  JPickerList,
  JPickerCurrent,
} from 'components/base/JPicker'

import Balance from './components/Balance'

export type AddressPickerItem = {|
  +name: string,
  +address: string,
  +fiatBalance: string,
|}

export type Props = {|
  +onItemClick: (address: string, index: number) => any,
  +addresses: AddressPickerItem[],
  +meta: FinalFormMeta,
  +input: FinalFormInput,
  +label: string,
|}

export default function AddressPicker({
  onItemClick,
  addresses,
  meta,
  input,
  label,
}: Props) {
  const {
    value,
    onBlur: handleBlur,
    onFocus: handleFocus,
  }: FinalFormInput = input

  const address: ?AddressPickerItem = addresses.find((_, index) => index === value)

  if (!address) {
    return null
  }

  const {
    fiatBalance,
    address: activeAddress,
    name: activeAddressName,
  }: AddressPickerItem = address

  return (
    <JPickerBody
      isOpen={meta.active || false}
      onOpen={handleFocus}
      onClose={handleBlur}
      currentRenderer={() => (
        <JPickerCurrent
          isEditable={false}
          label={label}
          value={activeAddressName}
          iconComponent={(
            <JIcon
              color='blue'
              name='0x-use-fill'
            />
          )}
          balancesComponent={(
            <Balance
              fiatBalance={fiatBalance}
              address={getShortenedAddress(activeAddress)}
            />
          )}
        />
      )}
    >
      <JPickerList
        onItemClick={onItemClick}
        activeItemKey={value}
      >
        {addresses.map((item: AddressPickerItem) => (
          <WalletAddressItem
            key={item.address}
            description={getShortenedAddress(item.address)}
            {...item}
          />
        ))}
      </JPickerList>
    </JPickerBody>
  )
}
