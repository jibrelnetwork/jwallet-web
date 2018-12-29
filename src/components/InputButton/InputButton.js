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
  +name: string,
  +icon: string,
  +value: string,
  +label: string,
  +isLoading: string,
  +placeholder: string,
  +errorMessage: string,
  +isLoading: boolean,
|}

type ComponentState = {|
  +isActive: boolean,
|}

class InputButton extends Component<Props, ComponentState> {
  static defaultProps = {
    isLoading: false,
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
    this.setState({ isActive })

    if (!isActive) {
      this.props.onChange('')
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
    }: Props = this.props

    return (
      <div className={classNames('input-button', this.state.isActive && '-active')}>
        <div className='field'>
          <JInput
            onChange={onChange}
            value={value}
            name={name}
            errorMessage={errorMessage}
            placeholder={placeholder}
            type='text'
            color='gray'
            isLoading={isLoading}
          />
          <div className='close' onClick={this.setIsActive(false)}>
            <JIcon
              color='blue'
              size='medium'
              name='padding-cross'
            />
          </div>
        </div>
        <div className='button' onClick={this.setIsActive(true)}>
          <JIcon
            name={icon}
            color='gray'
            size='medium'
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
