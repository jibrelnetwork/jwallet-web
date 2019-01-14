// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

type Props = {|
  +status: ?PasswordStatus,
  +isOffsetLeft: boolean,
|}

class PasswordFieldIndicator extends PureComponent<Props> {
  static defaultProps = {
    isOffsetLeft: false,
  }
  render() {
    const { status, isOffsetLeft }: Props = this.props
    return !status ? null : (
      <div className={classNames('password-field-indicator', isOffsetLeft && '-offset-left')}>
        <div className={`indicator -${status}`} />
      </div>
    )
  }
}

export default PasswordFieldIndicator
