// @flow

import React, { Component, Fragment } from 'react'

import classNames from 'classnames'

import { JFlatButton, JIcon, JTooltip } from 'components/base'

import type { JIconColor } from 'components/base/JIcon/JIcon'

type Props = {|
  +onClick: (SyntheticEvent<HTMLDivElement>) => void,
  +onCancelClick: Function,
  +color: 'blue' | 'gray' | 'sky' | 'white',
  +label: ?string,
  +bgColor: ?string,
  +iconTooltipName: ?string,
  +iconTooltipColor: ?JIconColor,
  +labelCancel: string,
  +labelConfirm: string,
  +confirmTimeout: number,
  +isReverse: boolean,
  isActive?: boolean,
|}

type ComponentState = {|
  countdown: number,
  intervalId: ?IntervalID,
  isActive: boolean,
|}

const ONE_SECOND: 1000 = 1000

class ButtonWithConfirm extends Component<Props, ComponentState> {
  static defaultProps = {
    label: null,
    bgColor: null,
    iconTooltipName: null,
    iconTooltipColor: null,
    confirmTimeout: 0,
    isReverse: false,
    isActive: false,
    onCancelClick: () => {},
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      intervalId: null,
      countdown: props.confirmTimeout,
      isActive: props.isActive || false,
    }
  }

  componentDidMount() {
    if (this.state.isActive) {
      this.initAction()
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
    this.props.onCancelClick()
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
      bgColor,
      iconTooltipName,
      iconTooltipColor,
      labelCancel,
      labelConfirm,
      isReverse,
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
              bgColor && `-overlay-${bgColor}`,
              isReverse && '-reverse',
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
                color={color}
                label={(countdown > 0) ? `${labelConfirm} – ${countdown} sec` : labelConfirm}
                isDisabled={countdown > 0}
                isBordered
              />
            </div>
          </div>
        ) : (
          <Fragment>
            {label && !iconTooltipName && !iconTooltipColor && (
              <JFlatButton
                onClick={this.initAction}
                label={label}
                color={color}
                isBordered
              />
            )}
            {iconTooltipName && iconTooltipColor && !label && (
              <div className='icon' onClick={this.initAction}>
                <JTooltip text='Delete'>
                  <JIcon
                    size='medium'
                    color={iconTooltipColor}
                    name={iconTooltipName}
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
