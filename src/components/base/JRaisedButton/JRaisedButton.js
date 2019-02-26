// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import handle from 'utils/eventHandlers/handle'

import {
  JIcon,
  JText,
  JLoader,
} from 'components/base'

import type { JTextColor } from 'components/base/JText/JText'
import type { JLoaderColor } from 'components/base/JLoader/JLoader'

import type {
  JIconSize,
  JIconColor,
} from 'components/base/JIcon/JIcon'

type JRaisedButtonColor = 'blue' | 'white'

type Props = {|
  +onClick: ?Function,
  +label: string,
  +iconName: ?string,
  +iconSize: JIconSize,
  +iconColor: JIconColor,
  +labelColor: JTextColor,
  +loaderColor: JLoaderColor,
  +color: JRaisedButtonColor,
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
      labelColor === 'dark' && '-hover-dark',
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
            color={((isHovered && labelColor !== 'dark') || isDisabled) ? 'white' : labelColor}
            weight='bold'
            whiteSpace='wrap'
          />
        </div>
      </div>
    )
  }
}

export default JRaisedButton
