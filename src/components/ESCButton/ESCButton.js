// @flow

import React, { Component } from 'react'

import RoundIconButton from 'components/RoundIconButton'

type ESCButtonColor = 'white' | 'gray'
type ESCButtonIconName = 'arrow-left' | 'padding-cross' | 'cross'

type Props = {|
  +onESC: () => void,
  +color: ESCButtonColor,
  +iconName: ESCButtonIconName,
  +isDisabled: boolean,
|}

class ESCButton extends Component<Props> {
  static defaultProps = {
    isDisabled: false,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleESC, true)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleESC, true)
  }

  handleClick = () => {
    const {
      onESC,
      isDisabled,
    } = this.props

    if (!isDisabled) {
      onESC()
    }
  }

  handleESC = (event: { keyCode: number }) => {
    if (event.keyCode === 27) {
      this.handleClick()
    }
  }

  render() {
    const {
      color, iconName,
    } = this.props

    return (
      <div className='esc-button'>
        <RoundIconButton
          onClick={this.handleClick}
          color={color}
          iconName={iconName}
        />
      </div>
    )
  }
}

export default ESCButton
