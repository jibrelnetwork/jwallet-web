// @flow strict

import React from 'react'
import classNames from 'classnames'
import { t } from 'ttag'
import { useFocus } from 'utils/hooks/useFocus'

import { JPickerListItem } from 'components/base/JPicker'
import { checkAddressValid } from 'utils/address'

import itemStyles from './quickSendItem.m.scss'

type Props = {|
  +address: string,
  +onChange: (address: string) => any,
|}

const handleItemClick = (
  onChange: (address: string) => any,
  address: string,
) => () => onChange(address)

export function QuickSendItem({
  address,
  onChange,
}: Props) {
  const [isFocused, {
    onFocus,
    onBlur,
  }] = useFocus()

  const isAddressValid = checkAddressValid(address)

  return (
    <JPickerListItem
      isSelected={false}
      isFocused={isAddressValid && isFocused}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={isAddressValid ? handleItemClick(onChange, address) : undefined}
    >
      <div className={classNames(
        itemStyles.core,
        isAddressValid && itemStyles.valid,
      )}
      >
        <div className={itemStyles.wrap}>
          <span className={itemStyles.title}>{t`Send to this address...`}</span>
          <span className={itemStyles.address}>{address}</span>
        </div>
      </div>
    </JPickerListItem>
  )
}
