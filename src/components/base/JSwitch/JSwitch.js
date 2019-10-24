// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

type Props = {|
  +onChange: ?((isChecked: boolean) => any),
  +name: string,
  +isChecked: boolean,
  +isDisabled: boolean,
|}

class JSwitch extends PureComponent<Props> {
  static defaultProps = {
    isChecked: false,
    isDisabled: false,
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
      isChecked,
      isDisabled,
    } = this.props

    return (
      <div className={classNames('j-switch', isDisabled && '-disabled')}>
        <label className='field'>
          <input
            onChange={!isDisabled ? this.onChange : null}
            name={`switch-${name}`}
            type='checkbox'
            className='checkbox'
            checked={isChecked}
            disabled={isDisabled}
          />
          <span className='switch' />
        </label>
      </div>
    )
  }
  /* eslint-enable jsx-a11y/label-has-for */
}

export default JSwitch
