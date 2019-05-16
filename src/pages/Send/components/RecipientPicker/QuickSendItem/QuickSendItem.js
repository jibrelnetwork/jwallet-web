// @flow strict

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

import { JPickerListItem } from 'components/base/JPicker'
import { checkAddressValid } from 'utils/address'

import itemStyles from './quickSendItem.m.scss'

type Props = {|
  +address: string,
  +onChange: (address: string) => any,
|}

type ComponenState = {|
  isFocused: boolean,
|}

export class QuickSendItem extends PureComponent<Props, ComponenState> {
  state = {
    isFocused: false,
  }

  handleFocus = () => {
    this.setState({ isFocused: true })
  }

  handleBlur = () => {
    this.setState({ isFocused: false })
  }

  handleItemClick = () => {
    this.props.onChange(this.props.address)
  }

  render() {
    const { address } = this.props

    const isAddressValid = checkAddressValid(address)

    return (
      <JPickerListItem
        isSelected={false}
        isFocused={isAddressValid && this.state.isFocused}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={isAddressValid ? this.handleItemClick : undefined}
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
}
