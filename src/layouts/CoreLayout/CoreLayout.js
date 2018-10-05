// @flow

import React, { PureComponent } from 'react'

import type { Node } from 'react'

type Props = {|
  +children: Node,
|}

class CoreLayout extends PureComponent<Props> {
  render() {
    return (
      <div className='core-layout'>
        {this.props.children}
      </div>
    )
  }
}

export default CoreLayout
