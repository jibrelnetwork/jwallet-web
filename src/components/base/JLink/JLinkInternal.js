// @flow

import React from 'react'
import { omit } from 'lodash-es'
import {
  BaseLink,
  withRouter,
} from 'react-router5'

import { type JLinkProps } from './JLink'

export type JLinkInternalProps = JLinkProps & {
  router: Object,
}

export function JLinkInternalDisconnected(initialProps: JLinkInternalProps) {
  const props = omit(initialProps, [
    'href',
  ])

  const {
    router,
    href,
  } = initialProps

  const route = router.matchUrl(href)

  if (!route) {
    /* eslint-disable jsx-a11y/anchor-has-content */
    // children are passed as props
    if (__DEV__) {
      console.warn(`Path ${href} does not have matching route, link leads to 404`)
    }

    return (
      <a
        {...props}
        href={href}
      />
    )
    /* eslint-enable jsx-a11y/anchor-has-content */
  }

  return (
    <BaseLink
      {...props}
      routeName={route.name}
      routeParams={route.params}
    />
  )
}

export const JLinkInternal = withRouter(JLinkInternalDisconnected)
