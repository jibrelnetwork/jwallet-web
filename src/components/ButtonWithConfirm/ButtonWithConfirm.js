// @flow

import React, { Component, Fragment } from 'react'

import classNames from 'classnames'

import { JFlatButton, JIcon, JTooltip } from 'components/base'

type Props = {|
  +onClick: (SyntheticEvent<HTMLDivElement>) => void,
  +color: string,
  +label: null | string,
  +iconName: string,
  +iconColor: string,
  +labelCancel: string,
  +labelConfirm: string,
  +labelConfirm: string,
  +confirmTimeout: number,
  +isReverse: boolean,
  +isOverlay: boolean,
|}

type ComponentState = {|
  countdown: number,
  intervalId: ?IntervalID,
  isActive: boolean,
|}

const ONE_SECOND: 1000 = 1000

class ButtonWithConfirm extends Component<Props, ComponentState> {
  static defaultProps = {
    color: 'white',
    label: null,
    iconColor: 'blue',
    confirmTimeout: 0,
    isReverse: false,
    isOverlay: false,
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
      color,
      label,
      iconName,
      iconColor,
      labelCancel,
      labelConfirm,
      isReverse,
      isOverlay,
    }: Props = this.props

    const {
      countdown,
      isActive,
    }: ComponentState = this.state

    return (
      <div className='button-with-confirm'>
        {isActive ? (
          <div
            className={classNames(
              'actions',
              color === 'blue' ? '-white' : '-blue',
              isReverse && '-reverse',
              isOverlay && '-overlay',
            )}
          >
            <JFlatButton
              onClick={this.cancelAction}
              label={labelCancel}
              color={color}
              isBordered
            />
            <div className='confirm'>
              <JFlatButton
                onClick={onClick}
                label={(countdown > 0) ? `${labelConfirm} – ${countdown} sec` : labelConfirm}
                color={color}
                isDisabled={countdown > 0}
                isBordered
              />
            </div>
          </div>
        ) : (
          <Fragment>
            {label ? (
              <JFlatButton
                onClick={this.initAction}
                label={label}
                color={color}
                isBordered
              />
            ) : (
              <div className='icon' onClick={this.initAction}>
                <JTooltip text='Delete'>
                  <JIcon
                    size='medium'
                    color={iconColor}
                    name={iconName}
                  />
                </JTooltip>
              </div>
            )}
          </Fragment>
        )}
      </div>
    )
  }
}

export default ButtonWithConfirm
