// @flow strict

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import { JIcon } from 'components/base'

import jCheckboxStyles from './jCheckbox.m.scss'

type JCheckboxColor = 'white' | 'gray' | 'black'
type JCheckboxHandler = (boolean) => void

type Props = {|
  +color: JCheckboxColor,
  +onChange: ?JCheckboxHandler,
  +name: string,
  +label: string,
  +children: React$Node,
  +isChecked: boolean,
  +isRegular: boolean,
|}

export class JCheckbox extends PureComponent<Props> {
  static defaultProps = {
    isChecked: false,
    isRegular: false,
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(event.target.checked)
    }
  }

  render() {
    const {
      color,
      name,
      label,
      children,
      isChecked,
      isRegular,
    } = this.props

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <div className={classNames('__checkbox', jCheckboxStyles.core)}>
        <label className={jCheckboxStyles.field}>
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
              color={color === 'gray' || color === 'black' ? 'blue' : color}
              name='checked-use-fill'
            />
          </span>
          <span className={classNames(
            'label',
            `-${color}`,
            isRegular ? null : '-bold',
          )}
          >
            {label}
          </span>
          {children}
        </label>
      </div>
    )
    /* eslint-enable jsx-a11y/label-has-for */
  }
}
