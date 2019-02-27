// @flow

import classNames from 'classnames'
import React, { Component } from 'react'

import {
  JIcon,
  JText,
  JInput,
} from 'components/base'

type Props = {|
  +onChange: (string) => void,
  +onActivate: ?((isActive: boolean) => void),
  +name: string,
  +icon: string,
  +value: string,
  +label: string,
  +isLoading: boolean,
  +placeholder: string,
  +errorMessage: string,
  +infoMessage: string,
|}

type ComponentState = {|
  +isActive: boolean,
|}

class InputButton extends Component<Props, ComponentState> {
  static defaultProps = {
    isLoading: false,
    onActivate: null,
    infoMessage: '',
    errorMessage: '',
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isActive: !!props.value,
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.props.value) {
      this.setState({ isActive: !!nextProps.value })
    }
  }

  setIsActive = (isActive: boolean) => () => {
    const {
      onActivate,
      onChange,
    } = this.props

    this.setState({ isActive })

    if (!isActive) {
      if (onActivate) {
        onActivate(false)
      }

      onChange('')
    } else if (onActivate) {
      onActivate(true)
    }
  }

  render() {
    const {
      onChange,
      name,
      icon,
      value,
      label,
      isLoading,
      placeholder,
      errorMessage,
      infoMessage,
    }: Props = this.props

    return (
      <div className={classNames('input-button', this.state.isActive && '-active')}>
        <div className='field'>
          <JInput
            onChange={onChange}
            value={value}
            name={name}
            errorMessage={errorMessage}
            infoMessage={infoMessage}
            placeholder={placeholder}
            type='text'
            color='gray'
            isLoading={isLoading}
            iconPosition='right'
          />
          <div className='close' onClick={this.setIsActive(false)}>
            <JIcon
              color='blue'
              name='padding-cross'
            />
          </div>
        </div>
        <div className='button' onClick={this.setIsActive(true)}>
          <JIcon
            name={icon}
            color='gray'
          />
          <JText
            value={label}
            size='normal'
            color='dark'
            weight='bold'
          />
        </div>
      </div>
    )
  }
}

export default InputButton
