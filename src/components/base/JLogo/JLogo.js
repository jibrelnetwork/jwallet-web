// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import { JLink } from 'components/base'

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
      <JLink href='/' className={classNames('j-logo', isOnlyIcon && '-only-icon')}>
        <span className='image' />
      </JLink>
    )
  }
}

export default JLogo
