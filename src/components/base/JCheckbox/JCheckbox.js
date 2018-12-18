// @flow

import React, { PureComponent } from 'react'

import JText from 'components/base/JText'

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

  onChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(event.target.checked)
    }
  }

  /* eslint-disable jsx-a11y/label-has-for */
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
  /* eslint-enable jsx-a11y/label-has-for */
}

export default JCheckbox
