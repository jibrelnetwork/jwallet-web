// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'

import { type JInputFieldProps } from 'components/base/JInputField/JInputField'

import {
  JIcon,
  JInputField,
} from 'components/base'

import styles from './passwordInput.m.scss'

type StateProps = {|
  +isHidden: boolean,
|}

export default class PasswordInput extends Component<JInputFieldProps, StateProps> {
  constructor(props: JInputFieldProps) {
    super(props)

    this.state = {
      isHidden: true,
    }
  }

  handleClick = () => {
    this.setState({ isHidden: !this.state.isHidden })
  }

  render() {
    const { isHidden }: StateProps = this.state

    return (
      <div
        className={classNames(
          '__password-input',
          styles.core,
          !isHidden && styles.visible,
        )}
      >
        {/* $FlowFixMe */}
        <JInputField
          {...this.props}
          type={isHidden ? 'password' : 'text'}
        />
        <div
          onClick={this.handleClick}
          className={classNames(styles.icon, styles.off)}
        >
          <JIcon
            name='visibility-off-use-fill'
          />
        </div>
        <div
          onClick={this.handleClick}
          className={classNames(styles.icon, styles.on)}
        >
          <JIcon
            name='visibility-on-use-fill'
          />
        </div>
      </div>
    )
  }
}
