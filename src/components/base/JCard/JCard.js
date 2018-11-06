// @flow

import React, { PureComponent } from 'react'

import classNames from 'classnames'

type Props = {
  color: 'blue' | 'white',
  title: ?string,
  children: ?React$Node,
  isHover: boolean,
  isBorderRadius: boolean,
}

class JCard extends PureComponent<Props, *> {
  static defaultProps = {
    // @TODO: check that the blue color is correct here
    color: 'blue',
    title: null,
    children: null,
    isHover: false,
    isBorderRadius: false,
  }

  render() {
    const { title, color, children, isBorderRadius, isHover } = this.props

    return (
      <div className={classNames(
        `j-card -${color}`,
        isBorderRadius && '-border-radius',
        isHover && '-hover')}
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
