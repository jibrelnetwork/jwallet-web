// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import handle from 'utils/eventHandlers/handle'
import { JIcon, JText, JLoader } from 'components/base'

type Props = {|
  +onClick: ?Function,
  +label: string,
  +iconName: ?string,
  +color: 'blue' | 'white',
  +iconColor: 'blue' | 'white',
  +iconSize: 'small' | 'medium',
  +labelColor: 'blue' | 'white',
  +loaderColor: 'blue' | 'white',
  +isWide: boolean,
  +isLoading: boolean,
  +isDisabled: boolean,
|}

type StateProps = {|
  isHovered: boolean,
|}

class JRaisedButton extends PureComponent<Props, StateProps> {
  static defaultProps = {
    iconName: null,
    color: 'blue',
    iconSize: 'medium',
    iconColor: 'white',
    labelColor: 'white',
    loaderColor: 'white',
    isWide: false,
    isLoading: false,
    isDisabled: false,
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
    }: Props = this.props

    const {
      isHovered,
    }: StateProps = this.state

    const buttonClassName = classNames(
      `j-raised-button -${color}`,
      isWide && '-wide',
      isHovered && '-hovered',
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
        onMouseEnter={handle(this.onHover)(true)}
        onMouseLeave={handle(this.onHover)(false)}
        onClick={isDisabled ? undefined : onClick}
        className={buttonClassName}
      >
        {iconName && (
          <div className='icon'>
            <JIcon name={iconName} size={iconSize} color={iconColor} />
          </div>
        )}
        <div className='label'>
          <JText
            value={label}
            color={(isHovered || isDisabled) ? 'white' : labelColor}
            weight='bold'
          />
        </div>
      </div>
    )
  }
}

export default JRaisedButton
