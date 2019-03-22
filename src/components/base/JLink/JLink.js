// @flow

import React from 'react'
import classnames from 'classnames'
import { omit } from 'lodash-es'

import {
  checkIsAnchor,
  checkIsExternal,
} from 'utils/uri'

import jLinkStyle from './JLink.m.scss'
import { type JLinkProps } from './types'
import JLinkInternalWithRouter from './JLinkInternal'

export const JLink = (initialProps: JLinkProps) => {
  const {
    href,
    theme,
    className: initialClassName,
  } = initialProps

  const props = omit(initialProps, [
    'theme',
    'className',
    'activeClassName',
    'rel',
  ])

  const className = classnames(
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
    <JLinkInternalWithRouter {...props} className={className} />
  )
}
