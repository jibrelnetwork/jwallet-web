// @flow

import classNames from 'classnames'
import { Link } from 'react-router'
import React, { PureComponent } from 'react'

type Props = {|
  +isOnlyIcon: boolean,
|}

class JLogo extends PureComponent<Props> {
  static defaultProps = {
    isOnlyIcon: false,
  }

  render() {
    const { isOnlyIcon }: Props = this.props

    return (
      <Link to='/' className={classNames('j-logo', isOnlyIcon && '-only-icon')}>
        <span className='image' />
      </Link>
    )
  }
}

export default JLogo
