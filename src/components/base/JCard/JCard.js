// @flow

import React, { PureComponent } from 'react'

type Props = {
  color: 'blue' | 'white',
  title: ?string,
  children: ?React$Node,
}

class JCard extends PureComponent<Props, *> {
  static defaultProps = {
    // @TODO: check that the blue color is correct here
    color: 'blue',
    title: null,
    children: null,
  }

  render() {
    const { title, color, children } = this.props

    return (
      <div className={`j-card -${color}`}>
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
