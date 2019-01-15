// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

type Props = {|
  +status: ?PasswordStatus,
  +color: 'white' | 'gray',
  +isOffsetRight: boolean,
|}

class PasswordFieldIndicator extends PureComponent<Props> {
  static defaultProps = {
    isOffsetRight: false,
  }
  render() {
    const { status, isOffsetRight, color }: Props = this.props
    return !status ? null : (
      <div className={classNames(
        'password-field-indicator',
        `-on-${color}-field`,
        color === 'gray' && isOffsetRight && '-offset-right'
      )}
      >
        <div className={`indicator -${status}`} />
      </div>
    )
  }
}

export default PasswordFieldIndicator
