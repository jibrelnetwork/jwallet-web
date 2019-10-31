// @flow strict

import React from 'react'

import { JIcon } from 'components/base'
import { WalletAddressItem } from 'components'
import { getShortenedAddress } from 'utils/address'

import {
  JPickerBody,
  JPickerList,
  JPickerCurrent,
} from 'components/base/JPicker'

import { WalletAddressBalance } from './WalletAddressBalance/WalletAddressBalance'

export type AddressPickerItem = {|
  +name: string,
  +address: string,
  +fiatBalance: string,
|}

export type Props = {|
  +onItemClick: (address: string, index: number) => any,
  +meta: FinalFormMeta,
  +input: FinalFormInput,
  +label: string,
  +addresses: AddressPickerItem[],
|}

export function AddressPicker({
  onItemClick,
  meta,
  input,
  label,
  addresses,
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
            <JIcon name='0x-use-fill' size='24' color='blue' />
          )}
          balancesComponent={(
            <WalletAddressBalance
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
