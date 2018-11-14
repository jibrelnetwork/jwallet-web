// @flow

import React, { Component } from 'react'
import MenuPanel from 'components/MenuPanel'

type Props = {|
  +openLayout: () => void,
  +closeLayout: () => void,
  +children: React$Node,
|}

class AsideLayout extends Component<Props> {
  componentDidMount() {
    this.props.openLayout()
  }

  componentWillUnmount() {
    this.props.closeLayout()
  }

  render() {
    return (
      <div className='aside-layout'>
        <div className='aside'>
          <MenuPanel />
        </div>
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default AsideLayout
