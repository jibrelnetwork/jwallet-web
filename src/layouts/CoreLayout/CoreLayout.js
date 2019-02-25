// @flow

import React, { Component } from 'react'

import 'styles/core.scss'

type Props = {|
  +openLayout: Function,
  +closeLayout: Function,
  +children: React$Node,
|}

class CoreLayout extends Component<Props> {
  componentDidMount() {
    this.props.openLayout()
  }

  componentWillUnmount() {
    this.props.closeLayout()
  }

  render() {
    return (
      <div className='core-layout'>
        {this.props.children}
      </div>
    )
  }
}

export default CoreLayout
