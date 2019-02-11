// @flow

import React, { PureComponent } from 'react'

import classNames from 'classnames'

type Props = {
  color: 'blue' | 'white',
  title: ?string,
  children: ?React$Node,
  isHover: boolean,
  isBorderRadius: boolean,
  isOnContrastBackground: boolean,
}

class JCard extends PureComponent<Props, *> {
  static defaultProps = {
    // @TODO: check that the blue color is correct here
    color: 'blue',
    title: null,
    children: null,
    isHover: false,
    isBorderRadius: false,
    isOnContrastBackground: false,
  }

  render() {
    const {
      title,
      color,
      children,
      isBorderRadius,
      isHover,
      isOnContrastBackground,
    } = this.props

    return (
      <div
        className={classNames(`j-card -${color}`, {
          '-border-radius': isBorderRadius,
          '-hover': isHover,
          '-on-contrast-background': isOnContrastBackground,
        })}
      >
        {title && (
          <div className='title'>
            {title}
          </div>
        )}
        {children && (
          <div className='content'>
            {children}
          </div>
        )}
      </div>
    )
  }
}

export default JCard
