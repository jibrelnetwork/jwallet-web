// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import { JLink } from 'components/base'

import jLogoStyle from './jLogo.m.scss'

type JLogoTheme = 'white' | 'blue'

type Props = {|
  +theme: JLogoTheme,
  +className: string,
|}

export class JLogo extends PureComponent<Props> {
  static defaultProps = {
    className: '',
    theme: 'white',
  }

  render() {
    const {
      theme,
      className,
    }: Props = this.props

    return (
      <JLink
        href='/'
        className={classNames(
          '__j-logo',
          jLogoStyle.core,
          className,
        )}
      >
        <span className={classNames(jLogoStyle.image, jLogoStyle[theme])} />
      </JLink>
    )
  }
}
