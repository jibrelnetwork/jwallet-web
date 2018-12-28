// @flow

import React, { Component } from 'react'

import { JText } from 'components/base'

type Props = {|
  value: Array,
|}

class PriorityPickerInfo extends Component<Props> {
  render() {
    const {
      value,
    } = this.props

    return (
      <div className='digital-assets-send-form-priority-picker-info'>
        {value.map(item => (
          <div className='line' key={item}>
            <JText value={item} whiteSpace='wrap' color='gray' align='center' />
          </div>
        ))}
      </div>
    )
  }
}

export default PriorityPickerInfo
