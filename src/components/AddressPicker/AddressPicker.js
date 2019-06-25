// @flow strict

import React from 'react'
import { t } from 'ttag'
import { map } from 'lodash-es'

import {
  WalletAddressItem,
} from 'components'

import {
  JIcon,
} from 'components/base'

import {
  JPickerBody,
  JPickerList,
  JPickerCurrent,
} from 'components/base/JPicker'

import {
  getShortenedAddress,
} from 'utils/address'

import {
  WalletAddressBalance,
} from './WalletAddressBalance/WalletAddressBalance'

export type AddressPickerItem = {|
  +name: string,
  +address: string,
  +fiatBalance: string,
|}

export type Props = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
  label: string,
  addresses: AddressPickerItem[],
|}

export function AddressPicker({
  meta,
  input,
  label,
  addresses,
}: Props) {
  const {
    value,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
  } = input

  const {
    fiatBalance = '',
    address: activeAddress = '',
    name: activeAddressName = '',
  } = addresses.find(addr => addr.address === value) || {}

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
          iconRenderer={() => (
            <JIcon name='0x-use-fill' size='24' color='blue' />
          )}
          balancesRenderer={() => (
            <WalletAddressBalance
              fiatBalance={fiatBalance}
              address={getShortenedAddress(activeAddress)}
            />
          )}
        />
      )}
    >
      <JPickerList
        onItemClick={handleChange}
        activeItemKey={value}
      >
        {map(addresses, (item: AddressPickerItem) => (
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

AddressPicker.defaultProps = {
  label: t`Address`,
  addresses: [],
}
