// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { JIcon, JText, JLoader } from 'components/base'

type Props = {
  onClick: Function,
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

class JRaisedButton extends PureComponent<Props, *> {
  static defaultProps = {
    color: 'white',
    iconName: null,
    iconSize: 'small',
    iconColor: 'white',
    labelColor: 'white',
    loaderColor: 'white',
    isWide: false,
    isDisabled: false,
    isLoading: false,
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
      <div onClick={isDisabled ? null : onClick} className={buttonClassName}>
        {iconName && (
          <div className='icon'>
            <JIcon name={iconName} size={iconSize} color={iconColor} />
          </div>
        )}
        <JText value={label} color={labelColor} weight='bold' />
      </div>
    )
  }
}

export default JRaisedButton
