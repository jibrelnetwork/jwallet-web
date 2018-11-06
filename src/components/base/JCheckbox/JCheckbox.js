// @flow

import React, { PureComponent } from 'react'

import { JText } from 'components/base'

type Props = {|
  +onChange: ?((boolean) => void),
  +name: string,
  +label: string,
  +isChecked: boolean,
|}

class JCheckbox extends PureComponent<Props> {
  static defaultProps = {
    isChecked: false,
  }

  onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(event.target.checked)
    }
  }

  render() {
    const {
      name,
      label,
      isChecked,
    } = this.props

    return (
      <div className='j-checkbox'>
        <label className='field'>
          <input
            onChange={this.onChange}
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
