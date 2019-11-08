// @flow strict

import React from 'react'
import classNames from 'classnames'
import { omit } from 'lodash-es'

import {
  checkIsAnchor,
  checkIsExternal,
} from 'utils/uri'

import styles from './JLink.m.scss'
import { JLinkInternal } from './JLinkInternal'

type JLinkHandler = (event: SyntheticEvent<HTMLAnchorElement>) => any

export type Theme
  = 'text-white'
  | 'text-blue'
  | 'button-general'
  | 'button-secondary'
  | 'button-general-confirm'
  | 'button-secondary-confirm'
  | 'button-additional-icon'

// base component with inexact props
export type JLinkProps = {|
  +onClick: ?JLinkHandler,
  +children: React$Node,
  +theme: Theme,
  +href: string,
  +title: ?string,
  +className: ?string,
  +activeClassName: ?string,
|}

export default function JLink(initialProps: JLinkProps) {
  const {
    href,
    theme,
    activeClassName,
    className: initialClassName,
  }: JLinkProps = initialProps

  const props = omit(initialProps, [
    'rel',
    'theme',
    'className',
    'activeClassName',
  ])

  const className = classNames(
    styles.core,
    theme && styles[theme],
    initialClassName,
  )

  /* eslint-disable jsx-a11y/anchor-has-content */
  // children are passed as props
  if (checkIsAnchor(href)) {
    return (
      <a
        {...props}
        className={className}
      />
    )
  }

  if (checkIsExternal(href)) {
    return (
      <a
        target='_blank'
        {...props}
        className={className}
        rel='noopener noreferrer'
      />
    )
  }
  /* eslint-enable jsx-a11y/anchor-has-content */

  return (
    <JLinkInternal
      {...props}
      className={className}
      activeClassName={activeClassName}
    />
  )
}

JLink.defaultProps = {
  onClick: null,
  title: null,
  className: null,
  theme: 'text-white',
  activeClassName: null,
}
