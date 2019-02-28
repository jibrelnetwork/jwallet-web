// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import {
  JIcon,
  JText,
} from 'components/base'

type RoundIconButtonBgColor = 'blue'
type RoundIconButtonColor = 'gray' | 'white'

type Props = {
  onClick: () => void,
  label: ?string,
  iconName: string,
  color: RoundIconButtonColor,
  bgColor: ?RoundIconButtonBgColor,
  hasShadow: boolean,
  isBordered: boolean,
}

class RoundIconButton extends PureComponent<Props> {
  static defaultProps = {
    color: 'white',
    label: null,
    bgColor: null,
    hasShadow: false,
    isBordered: false,
  }

  render() {
    const {
      onClick,
      color,
      label,
      bgColor,
      iconName,
      hasShadow,
      isBordered,
    }: Props = this.props

    return (
      <div
        onClick={onClick}
        className={classNames(
          `round-icon-button -${color}`,
          isBordered && '-border',
          hasShadow && '-box-shadow',
          bgColor && `-bg-${bgColor}`,
        )}
      >
        {label && (
          <div className='label'>
            <JText value={label} color={color} fontCase='upper' />
          </div>
        )}
        <div className='icon'>
          <JIcon name={iconName} color={color} size='medium' />
        </div>
      </div>
    )
  }
}

export default RoundIconButton
