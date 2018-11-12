// @flow

import React, { PureComponent } from 'react'

type Props = {|
  +onChange: ?((boolean) => void),
  +name: string,
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

  render() {
    const {
      name,
      isChecked,
    } = this.props

    return (
      <div className='j-switch'>
        <label className='field'>
          <input
            onChange={this.onChange}
            name={`switch-${name}`}
            type='checkbox'
            className='checkbox'
            defaultChecked={isChecked}
          />
          <span className='switch' />
        </label>
      </div>
    )
  }
}

export default JCheckbox
