// @flow

import React, { PureComponent } from 'react'
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
}

export class JLinkBackDisconnected extends PureComponent<Props> {
  static defaultProps = {
    theme: null,
    className: null,
    activeClassName: null,
    params: null,
    previousRoute: null,
    routeParams: null,
  }

  handleClick = (event: SyntheticMouseEvent<EventTarget>) => {
    if (this.props.previousRoute) {
      event.preventDefault()
      window.history.back()
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

    return (
      <Link
        {...this.props}
        className={className}
        onClick={this.handleClick}
      />
    )
  }
}

/* ::
type OwnProps = {|
  +children: React$Node,
  +routeName: string,
|}
*/

// FIXME: support inexact OwnProps
export const JLinkBack = connect/* :: < AppState, any, OwnProps, _, _ > */(
  (state: AppState) => ({
    previousRoute: state.router.previousRoute,
  }),
)(JLinkBackDisconnected)
