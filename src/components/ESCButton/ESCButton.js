// @flow

import React, { Component } from 'react'

import RoundIconButton from 'components/RoundIconButton'

type ESCButtonColor = 'white' | 'gray'

type Props = {|
  +onESC: () => void,
  +color: ESCButtonColor,
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
    return (
      <div className='esc-button'>
        <RoundIconButton
          onClick={this.handle}
          iconName='arrow-left'
          color={this.props.color}
        />
      </div>
    )
  }
}

export default ESCButton
