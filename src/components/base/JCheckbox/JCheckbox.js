// @flow strict

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import JIcon from 'components/base/JIcon'

import styles from './jCheckbox.m.scss'

type JCheckboxHandler = (boolean) => void

type Props = {|
  +onChange: ?JCheckboxHandler,
  +children: React$Node,
  +name: string,
  +isChecked: boolean,
|}

export default class JCheckbox extends PureComponent<Props> {
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
    }: Props = this.props

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <div className={classNames('__checkbox', styles.core)}>
        <label className={styles.field}>
          <input
            onChange={this.handleChange}
            name={name}
            className={styles.input}
            type='checkbox'
            defaultChecked={isChecked}
          />
          <span className={classNames(styles.tick, styles.off, 'off')}>
            <JIcon name='checkbox_off_24-use-fill' />
          </span>
          <span className={classNames(styles.tick, styles.on, 'on')}>
            <JIcon name='checkbox_on_24-use-fill' />
          </span>
          {children}
        </label>
      </div>
    )
    /* eslint-enable jsx-a11y/label-has-for */
  }
}
