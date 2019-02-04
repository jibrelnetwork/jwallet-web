// @flow

import React, { Component } from 'react'

import classNames from 'classnames'

import { JFlatButton } from 'components/base'

type Props = {|
  +onClick: (SyntheticEvent<HTMLDivElement>) => void,
  +onCancelClick: Function,
  +color: 'blue' | 'gray' | 'sky' | 'white',
  +bgColor: ?string,
  +labelCancel: string,
  +labelConfirm: string,
  +confirmTimeout: number,
  +isReverse: boolean,
|}

type ComponentState = {|
  countdown: number,
  intervalId: ?IntervalID,
|}

const ONE_SECOND: 1000 = 1000

class ButtonWithConfirm extends Component<Props, ComponentState> {
  static defaultProps = {
    bgColor: null,
    confirmTimeout: 0,
    isReverse: false,
    onCancelClick: () => {},
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      intervalId: null,
      countdown: props.confirmTimeout,
    }
  }

  componentDidMount() {
    this.initAction()
  }

  setIntervalId = (intervalId: ?IntervalID) => {
    this.setState({ intervalId })
  }

  setCountdown = (countdown: number) => {
    if (countdown < 0) {
      this.finishCountdown()
    } else {
      this.setState({ countdown })
    }
  }

  startCountdown = () => {
    const intervalId: IntervalID = setInterval(() => {
      this.setCountdown(this.state.countdown - 1)
    }, ONE_SECOND)

    this.setIntervalId(intervalId)
  }

  finishCountdown = () => {
    const { intervalId } = this.state

    if (intervalId) {
      clearInterval(intervalId)
      this.setIntervalId(null)
    }
  }

  resetCountdown = () => {
    this.finishCountdown()
    this.setCountdown(this.props.confirmTimeout)
    this.props.onCancelClick()
  }

  initAction = () => {
    this.startCountdown()
  }

  render() {
    const {
      onClick,
      color,
      bgColor,
      labelCancel,
      labelConfirm,
      isReverse,
    }: Props = this.props

    const {
      countdown,
    }: ComponentState = this.state

    return (
      <div className='button-with-confirm'>
        <div
          className={classNames(
            'actions',
            bgColor && `-overlay-${bgColor}`,
            isReverse && '-reverse',
          )}
        >
          <JFlatButton
            onClick={this.resetCountdown}
            label={labelCancel}
            color={color}
            isBordered
          />
          <div className='confirm'>
            <JFlatButton
              onClick={onClick}
              color={color}
              label={(countdown > 0) ? `${labelConfirm} – ${countdown} sec` : labelConfirm}
              isDisabled={countdown > 0}
              isBordered
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ButtonWithConfirm
