// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/eventHandlers/handle'

import { JText, JIcon } from 'components/base'

type Props<T> = {|
  +icon: string,
  +title: string,
  +titleIcon: string,
  +description: string,
  +fiatBalance: string,
  +isLoading: boolean,

  +value: T,
  +onSelect: (value: T) => void,
  +isSelected: boolean,
  +isDisabled: boolean,
|}

function FullPickerItem<T>({
  icon,
  title,
  titleIcon,
  description,
  fiatBalance,
  isLoading,
  value,
  onSelect,
  isSelected,
  isDisabled,
}: Props<T>) {
  return (
    <div
      className={classNames(
        'j-picker-full-item',
        isSelected && '-active',
        isDisabled && '-disabled'
      )}
      onClick={isDisabled ? undefined : handle(onSelect)(value)}
    >
      <div className='info'>
        <div className='symbol'>
          <div className='wrap'>
            <JIcon name={icon} color={isSelected ? 'blue' : 'gray'} />
          </div>
        </div>
        <div className='title'>
          {titleIcon && <JIcon name={titleIcon} />}
          <JText value={title} color='gray' weight='bold' whiteSpace='wrap' />
        </div>
        <div className='description'>
          <JText value={description} color='gray' whiteSpace='wrap' />
        </div>
      </div>
      {(fiatBalance || isLoading) &&
        <div className='fiat-balance'>
          {isLoading
            ? <JIcon name='loading' color={isSelected ? 'blue' : 'gray'} />
            : <JText value={fiatBalance || ''} />}
        </div>}
    </div>
  )
}

FullPickerItem.defaultProps = {
  isDisabled: false,
  fiatBalance: '',
  isLoading: false,
  titleIcon: '',
  isSelected: false,
  description: '',
}

export default FullPickerItem
