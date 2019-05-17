// @flow strict

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import { JIcon } from 'components/base'

import jCheckboxStyles from './jCheckbox.m.scss'

type JCheckboxHandler = (boolean) => void

type Props = {|
  +onChange: ?JCheckboxHandler,
  +name: string,
  +children: React$Node,
  +isChecked: boolean,
|}

export class JCheckbox extends PureComponent<Props> {
  static defaultProps = {
    isChecked: false,
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(event.target.checked)
    }
  }

  render() {
    const {
      name,
      children,
      isChecked,
    } = this.props

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <div className={classNames('__checkbox', jCheckboxStyles.core)}>
        <label className={jCheckboxStyles.field} >
          <input
            onChange={this.handleChange}
            name={name}
            className={jCheckboxStyles.input}
            type='checkbox'
            defaultChecked={isChecked}
          />
          <span className={classNames(jCheckboxStyles.tick, jCheckboxStyles.off, 'off')}>
            <JIcon
              color='gray'
              name='unchecked'
            />
          </span>
          <span className={classNames(jCheckboxStyles.tick, jCheckboxStyles.on, 'on')}>
            <JIcon
              color='blue'
              name='checked'
            />
          </span>
          {children}
        </label>
      </div>
    )
    /* eslint-enable jsx-a11y/label-has-for */
  }
}
