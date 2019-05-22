// @flow

import React from 'react'
import classnames from 'classnames'
import { omit } from 'lodash-es'

import {
  checkIsAnchor,
  checkIsExternal,
} from 'utils/uri'

import jLinkStyle from './JLink.m.scss'
import { JLinkInternal } from './JLinkInternal'

export type Theme
  = 'text-white'
  | 'text-blue'
  | 'button-general'
  | 'button-secondary'

// base component with inexact props
export type JLinkProps = {
  theme?: Theme,
  className?: string,
  activeClassName?: string,
  +children: React$Node,
  +href: string,
}

export function JLink(initialProps: JLinkProps) {
  const {
    href,
    theme,
    className: initialClassName,
    activeClassName,
  } = initialProps

  const props = omit(initialProps, [
    'theme',
    'className',
    'activeClassName',
    'rel',
  ])

  const className = classnames(
    jLinkStyle.core,
    theme && jLinkStyle[theme],
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
