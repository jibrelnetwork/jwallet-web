// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/eventHandlers/handle'

import { JText, JIcon } from 'components/base'

type Props = {|
  +icon: string,
  +title: string,
  +titleIcon: string,
  +description: string,
  +fiatBalance: string,
  +isLoading: boolean,

  +value: string,
  +onSelect: (value: string) => void,
  +isSelected: boolean,
  +isDisabled: boolean,
|}

function FullPickerItem({
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
}: Props) {
  return (
    <div
      className={classNames(
        'full-picker-item',
        isSelected && '-active'
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
          { titleIcon && <JIcon name={titleIcon} />}
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
            : <JText value={fiatBalance} />}
        </div>}
    </div>
  )
}

FullPickerItem.defaultProps = {
  isDisabled: false,
  fiatBalance: null,
  isLoading: false,
  titleIcon: '',
  isSelected: false,
  description: '',
}

export default FullPickerItem
