// @flow

import React, { Component } from 'react'

import MenuPanel from 'components/MenuPanel'

type Props = {
  children: Object,
}

class MenuLayout extends Component<Props> {
  componentDidMount() {
    console.log('MOUNT MenuLayout')
  }

  componentWillUnmount() {
    console.log('UNMOUNT MenuLayout')
  }

  render() {
    return (
      <div className='menu-layout'>
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

export default MenuLayout
