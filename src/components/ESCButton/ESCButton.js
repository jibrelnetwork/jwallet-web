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
    window.addEventListener('keydown', this.handleOnESC, true)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleOnESC, true)
  }

  handle = () => {
    const { onESC, isDisabled } = this.props

    if (!isDisabled) {
      onESC()
    }
  }

  handleOnESC = (event: { keyCode: number }) => {
    if (event.keyCode === 27) {
      this.handle()
    }
  }

  render() {
    const { color, iconName } = this.props

    return (
      <div className='esc-button'>
        <RoundIconButton
          onClick={this.handle}
          color={color}
          iconName={iconName}
        />
      </div>
    )
  }
}

export default ESCButton
