// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import handle from 'utils/eventHandlers/handle'

import handle from 'utils/eventHandlers/handle'
import { JIcon, JText, JLoader } from 'components/base'

type Props = {
  onClick: ?Function,
  label: string,
  iconName: ?string,
  color: 'blue' | 'white',
  iconColor: 'blue' | 'white',
  iconSize: 'small' | 'medium',
  labelColor: 'blue' | 'white',
  loaderColor: 'blue' | 'white',
  isWide: boolean,
  isDisabled: boolean,
  isLoading: boolean,
}

type ButtonState = {
  isHovered: boolean,
}

class JRaisedButton extends PureComponent<Props, ButtonState> {
  static defaultProps = {
    iconName: null,
    color: 'blue',
    iconColor: 'white',
    iconSize: 'medium',
    labelColor: 'white',
    loaderColor: 'white',
    isWide: false,
    isDisabled: false,
    isLoading: false,
    isHovered: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isHovered: false,
    }
  }

  onHover = (isHovered: boolean) => {
    this.setState({ isHovered })
  }

  render() {
    const {
      onClick,
      label,
      color,
      iconName,
      iconSize,
      iconColor,
      labelColor,
      loaderColor,
      isWide,
      isDisabled,
      isLoading,
    } = this.props

    const {
      isHovered,
    } = this.state

    const buttonClassName = classNames(
      `j-raised-button -${color}`,
      isWide && '-wide',
      isDisabled && '-disabled',
    )

    if (isLoading) {
      return (
        <div className={`${buttonClassName} -loading`}>
          <JLoader color={loaderColor} />
        </div>
      )
    }

    return (
      <div
        onClick={isDisabled ? undefined : onClick}
        onMouseEnter={handle(this.onHover)(true)}
        onMouseLeave={handle(this.onHover)(false)}
        className={buttonClassName}
      >
        {iconName && (
          <div className='icon'>
            <JIcon name={iconName} size={iconSize} color={iconColor} />
          </div>
        )}
        <div className='label'>
          <JText value={label} color={isHovered ? 'white' : labelColor} weight='bold' />
        </div>
      </div>
    )
  }
}

export default JRaisedButton
