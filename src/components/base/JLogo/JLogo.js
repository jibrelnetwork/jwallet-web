// @flow

import classNames from 'classnames'
import { Link } from 'react-router'
import React, { PureComponent } from 'react'

type Props = {|
  +isMinimal: boolean,
|}

class JLogo extends PureComponent<Props> {
  static defaultProps = {
    isMinimal: false,
  }

  render() {
    const { isMinimal }: Props = this.props

    return (
      <Link to='/' className={classNames('j-logo', isMinimal && '-minimal')}>
        <span className='image' />
      </Link>
    )
  }
}

export default JLogo
