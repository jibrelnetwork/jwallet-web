// @flow

import React, { PureComponent } from 'react'

import { JText } from 'components/base'

type Props = {|
  +name: number | string,
  +value: string,
  +label: string,
  +isChecked: boolean,
|}

class JCheckbox extends PureComponent<Props> {
  static defaultProps = {
    isChecked: false,
  }

  render() {
    const {
      name,
      value,
      label,
      isChecked,
    } = this.props

    return (
      <div className='j-checkbox'>
        <label className='field'>
          <input
            name={`checkbox-${name}`}
            type='checkbox'
            value={value}
            className='checkbox'
            defaultChecked={isChecked}
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
