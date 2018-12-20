// @flow

import React, { Component, Fragment } from 'react'

import { JText } from 'components/base'

type Props = {|
  placeholder: string,
  label: string,
  value: string,
|}

type ComponentState = {
  filterTextInput: React$ElementRef<any>,
}

class AssetPickerCurrent extends Component<Props, ComponentState> {
  static defaultProps = {
    placeholder: 'Select priority',
    label: 'Priority',
  }

  render() {
    const {
      label,
      value,
      placeholder,
    } = this.props

    return (
      <div className='priority-picker-current'>
        {!value &&
        <div className='placeholder'>
          <JText value={placeholder} whiteSpace='wrap' color='gray' />
        </div>}
        {value &&
        <Fragment>
          <div className='label'>
            <JText
              value={label}
              color='gray'
              size='small'
              whiteSpace='wrap'
            />
          </div>
          <div className='value'>
            <JText
              value={value}
              color='gray'
              size='semilarge'
              weight='bold'
              whiteSpace='wrap'
            />
          </div>
        </Fragment>}
      </div>
    )
  }
}

export default AssetPickerCurrent
