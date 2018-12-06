// @flow

import React, { Component } from 'react'

import { JRaisedButton, JInput } from 'components/base'

import './passwordStep.scss'

type Props = {|
  onSubmit: (password: string) => void,
  submitLabel: string,
  errorMessage: string,
  placeholder: string,
  isLoading: boolean,
  children: ?React$Node,
|}

type ComponentState = {
  password: string,
}

class PasswordStep extends Component<Props, ComponentState> {
  static defaultProps = {
    submitLabel: 'Confirm',
    errorMessage: '',
    placeholder: 'Security password',
    isLoading: false,
    children: null,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      password: '',
    }
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.password)
  }

  setPassword = (newValue: string) => {
    this.setState({ password: newValue })
  }

  render() {
    const {
      children,
      submitLabel,
      errorMessage,
      placeholder,
      isLoading,
    } = this.props

    return (
      <div className='password-step'>
        {children && <div className='wrap'>{children}</div>}
        <div className='form'>
          <JInput
            type='password'
            onChange={this.setPassword}
            value={this.state.password}
            name='password'
            errorMessage={errorMessage}
            placeholder={placeholder}
            color='gray'
            isDisabled={isLoading}
          />
          <div className='actions'>
            <JRaisedButton
              onClick={this.onSubmit}
              isLoading={isLoading}
              label={submitLabel}
              isWide
            />
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordStep
