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

export const JLinkInternal = (initialProps: JLinkInternalProps) => {
  const {
    name: routeName,
    params: routeParams,
  } = initialProps.router.matchUrl(initialProps.href)
  const props = omit(initialProps, [
    'href',
  ])

  return (
    <BaseLink
      {...props}
      routeName={routeName}
      routeParams={routeParams}
    />
  )
}

export const JLinkInternalWithRouter = withRouter(JLinkInternal)
