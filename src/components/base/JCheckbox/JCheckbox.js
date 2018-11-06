// @flow

import React, { PureComponent } from 'react'

import { JText } from 'components/base'

type Props = {|
  +onChange: ?Function,
  +name: string,
  +label: string,
  +isChecked: boolean,
|}

class JCheckbox extends PureComponent<Props> {
  static defaultProps = {
    isChecked: false,
  }

  render() {
    const {
      onChange,
      name,
      label,
      isChecked,
    } = this.props

    return (
      <div className='j-checkbox'>
        <label className='field'>
          <input
            onChange={onChange}
            name={`checkbox-${name}`}
            type='checkbox'
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
