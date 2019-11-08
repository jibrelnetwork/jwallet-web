// @flow strict

import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { omit } from 'lodash-es'
import { Link } from 'react-router5'
import { connect } from 'react-redux'

import styles from '../JLink/JLink.m.scss'
import { type Theme } from '../JLink/JLink'

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

type OwnProps = {|
  +children: React$Node,
  className?: ?string,
  +routeName: string,
  routeParams?: ?{
    [key: string]: any,
  },
  theme?: ?Theme,
  activeClassName?: ?string,
  onClick?: ?Function,
|}

export default class JLinkBack extends PureComponent<Props> {
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

    const className = classNames(
      theme && styles[theme],
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

const mapStateToProps = (state: AppState) => ({
  previousRoute: state.router.previousRoute,
})

// FIXME: support inexact OwnProps
export const JLinkBackEnhanced = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(JLinkBack)
