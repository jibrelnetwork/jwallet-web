// @flow

import React, { PureComponent } from 'react'

import { JText } from 'components/base'

type Props = {|
  +name: number | string,
  +label: number | string,
|}

class JCheckbox extends PureComponent<Props> {
  render() {
    const {
      name,
      label,
    } = this.props

    return (
      <div className='j-checkbox'>
        <label className='field'>
          <input
            type='checkbox'
            className='checkbox'
            name={`checkbox-${name}`}
          />
          <span className='flag' />
          <span className='label'>
            <JText
              color='gray'
              size='normal'
              value={label}
              weight='bold'
              whiteSpace='wrap'
            />
          </span>
        </label>
      </div>
    )
  }
}

export default JCheckbox
