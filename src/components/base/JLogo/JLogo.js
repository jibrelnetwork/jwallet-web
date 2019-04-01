// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import { JLink } from 'components/base'

import jLogoStyle from './jLogo.m.scss'

type JLogoTheme = 'white' | 'blue'

type Props = {|
  +theme: JLogoTheme,
|}

export class JLogo extends PureComponent<Props> {
  static defaultProps = {
    theme: 'white',
  }

  render() {
    const { theme }: Props = this.props

    return (
      <JLink to='/' className={jLogoStyle.core}>
        <span className={classNames(jLogoStyle.image, jLogoStyle[theme])} />
      </JLink>
    )
  }
}
