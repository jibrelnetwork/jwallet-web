// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

type Props = {|
  +openLayout: () => void,
  +closeLayout: () => void,
  +children: React$Node,
|}

class WalletsLayout extends Component<Props> {
  componentDidMount() {
    this.props.openLayout()
  }

  componentWillUnmount() {
    this.props.closeLayout()
  }

  render() {
    return (
      <div className='wallets-layout'>
        <Scrollbars autoHide>
          {this.props.children}
        </Scrollbars>
      </div>
    )
  }
}

export default WalletsLayout
