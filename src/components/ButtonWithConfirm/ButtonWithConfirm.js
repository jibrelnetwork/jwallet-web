// @flow

import React, { Component, Fragment } from 'react'

import JFlatButton from 'components/base/JFlatButton'

type Props = {|
  +onClick: (SyntheticEvent<HTMLDivElement>) => void,
  +label: string,
  +labelCancel: string,
  +labelConfirm: string,
  +confirmTimeout: number,
|}

type ComponentState = {|
  countdown: number,
  intervalId: ?IntervalID,
  isActive: boolean,
|}

const ONE_SECOND: 1000 = 1000

class ButtonWithConfirm extends Component<Props, ComponentState> {
  static defaultProps = {
    confirmTimeout: 0,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      intervalId: null,
      countdown: props.confirmTimeout,
      isActive: false,
    }
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
  }

  initAction = () => {
    this.setState({ isActive: true })
    this.startCountdown()
  }

  cancelAction = () => {
    this.setState({ isActive: false })
    this.resetCountdown()
  }

  render() {
    const {
      onClick,
      label,
      labelCancel,
      labelConfirm,
    }: Props = this.props

    const {
      countdown,
      isActive,
    }: ComponentState = this.state

    return (
      <div className='button-with-confirm'>
        {isActive ? (
          <Fragment>
            <JFlatButton
              onClick={this.cancelAction}
              label={labelCancel}
              color='white'
              isBordered
            />
            <div className='confirm'>
              <JFlatButton
                onClick={onClick}
                label={(countdown > 0) ? `${labelConfirm} – ${countdown} sec` : labelConfirm}
                color='white'
                isDisabled={countdown > 0}
                isBordered
              />
            </div>
          </Fragment>
        ) : (
          <JFlatButton
            onClick={this.initAction}
            label={label}
            color='white'
            isBordered
          />
        )}
      </div>
    )
  }
}

export default ButtonWithConfirm
