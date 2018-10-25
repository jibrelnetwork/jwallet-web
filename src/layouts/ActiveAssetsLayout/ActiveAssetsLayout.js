// @flow

import React, { Component } from 'react'

import MenuLayout from 'layouts/MenuLayout'
import ActiveAssetsPanel from 'components/ActiveAssetsPanel'

type Props = {
  children: Object,
}

class ActiveAssetsLayout extends Component<Props> {
  componentDidMount() {
    console.log('MOUNT ActiveAssetsLayout')
  }

  componentWillUnmount() {
    console.log('UNMOUNT ActiveAssetsLayout')
  }

  render() {
    return (
      <MenuLayout>
        <div className='active-assets-layout'>
          <div className='panel'>
            <ActiveAssetsPanel />
          </div>
          <div className='content'>
            {this.props.children}
          </div>
        </div>
      </MenuLayout>
    )
  }
}

export default ActiveAssetsLayout
