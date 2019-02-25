// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import JText from 'components/base/JText'

type Props = {|
  +onChange: ?((boolean) => void),
  +name: string,
  +label: React$Node,
  +isChecked: boolean,
|}

class JRadio extends PureComponent<Props> {
  static defaultProps = {
    isChecked: false,
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
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
      <div className={classNames('j-radio', isChecked && '-checked')}>
        <label className='field'>
          <input
            onChange={this.handleChange}
            name={`radio-${name}`}
            type='radio'
            className='checkbox'
            checked={isChecked}
          />
          <div className='flag' />
          <div className='label'>
            {(typeof label !== 'string') ? label : (
              <JText
                color='white'
                size='small'
                value={label}
                weight='bold'
                whiteSpace='wrap'
              />
            )}
          </div>
        </label>
      </div>
    )
  }
  /* eslint-enable jsx-a11y/label-has-for */
}

export default JRadio
