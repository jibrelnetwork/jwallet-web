// @flow strict

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

function JLinkInternal(props: JLinkInternalProps) {
  const {
    router,
    href,
  } = props

  const route = router && router.matchUrl(href)

  if (!route) {
    if (__DEV__) {
      console.warn(`Path ${href} does not have matching route, link leads to 404`)
    }

    return <a {...omit(props, ['activeClassName', 'children'])}>{props.children}</a>
  }

  return (
    <BaseLink
      {...omit(props, ['href'])}
      routeName={route.name}
      routeParams={route.params}
    />
  )
}

const JLinkInternalEnhanced = withRouter(JLinkInternal)

export { JLinkInternalEnhanced as JLinkInternal }
