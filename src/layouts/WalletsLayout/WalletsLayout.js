// @flow

import React, { Component } from 'react'

import walletsLayoutStyle from './walletsLayout.m.scss'

export type Props = {|
  +children: React$Node,
|}

export class WalletsLayout extends Component<Props> {
  componentDidMount() {
    // this.props.openLayout()
  }

  componentWillUnmount() {
    // this.props.closeLayout()
  }

  render() {
    return (
      <div className={walletsLayoutStyle.core}>
        {this.props.children}
      </div>
    )
  }
}
