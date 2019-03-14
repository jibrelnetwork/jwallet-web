// @flow

import React from 'react'
import classnames from 'classnames'
import { omit } from 'lodash-es'

import jLinkStyle from './JLink.m.scss'
import { type JLinkProps } from './types'
import JLinkInternalWithRouter from './JLinkInternal'
import {
  isAnchor,
  isExternal,
} from './utils'

export const JLink = (initialProps: JLinkProps) => {
  const { href } = initialProps
  const props = omit(initialProps, [
    'theme',
    'className',
    'activeClassName',
    'rel',
  ])
  const className = classnames(
    initialProps.theme && jLinkStyle[initialProps.theme],
    initialProps.className,
  )

  /* eslint-disable jsx-a11y/anchor-has-content */
  // children are passed as props
  if (isAnchor(href)) {
    return (
      <a
        {...props}
        className={className}
      />
    )
  }

  if (isExternal(href)) {
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
