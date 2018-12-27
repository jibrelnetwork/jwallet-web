// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { JInput, JText, JIcon } from 'components/base'

type Props = {|
  +onChange: () => void,
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
  isActive: boolean,
|}

class InputButton extends PureComponent<Props, ComponentState> {
  static defaultProps = {
    isLoading: false,
  }
  constructor(props: Props) {
    super(props)

    this.state = {
      isActive: false,
    }
  }

  onActivation = (isActive: boolean) => () => this.setState({ isActive })

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

    const {
      isActive,
    }: ComponentState = this.state

    return (
      <div className={classNames('input-button', isActive && '-active')}>
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
          <div className='close' onClick={this.onActivation(false)}>
            <JIcon
              color='blue'
              size='medium'
              name='padding-cross'
            />
          </div>
        </div>
        <div className='button' onClick={this.onActivation(true)}>
          <JIcon
            color='gray'
            size='medium'
            name={icon}
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
