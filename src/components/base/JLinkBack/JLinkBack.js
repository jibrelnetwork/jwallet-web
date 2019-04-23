// @flow

import React, { PureComponent } from 'react'
import { omit } from 'lodash-es'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router5'

import { type Theme } from '../JLink/JLink'

import jLinkStyle from '../JLink/JLink.m.scss'

// base component with inexact props
type Props = {
  +children: React$Node,
  previousRoute?: Object,
  routeParams?: ?{
    [key: string]: any,
  },
  theme?: ?Theme,
  +routeName: string,
  className?: ?string,
  activeClassName?: ?string,
  onClick?: ?Function,
}

export class JLinkBackDisconnected extends PureComponent<Props> {
  static defaultProps = {
    theme: null,
    className: null,
    activeClassName: null,
    params: null,
    previousRoute: null,
    routeParams: null,
    onClick: null,
  }

  handleClick = (event: SyntheticMouseEvent<EventTarget>) => {
    if (this.props.previousRoute) {
      event.preventDefault()
      window.history.back()
    }

    if (this.props.onClick) {
      this.props.onClick(event)
    }
  }

  render() {
    const {
      theme,
      className: initialClassName,
    } = this.props

    const className = classnames(
      theme && jLinkStyle[theme],
      initialClassName,
    )

    const props = omit(this.props, [
      'dispatch',
      'className',
      'onClick',
    ])

    return (
      <Link
        {...props}
        className={className}
        onClick={this.handleClick}
      />
    )
  }
}

/* ::
type OwnProps = {|
  +children: React$Node,
  className?: ?string,
  +routeName: string,
|}
*/

// FIXME: support inexact OwnProps
export const JLinkBack = connect/* :: < AppState, any, OwnProps, _, _ > */(
  (state: AppState) => ({
    previousRoute: state.router.previousRoute,
  }),
)(JLinkBackDisconnected)
