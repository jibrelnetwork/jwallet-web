// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import MenuLayout from 'layouts/MenuLayout'
import { JSearch, JTabs } from 'components/base'

const DIGITAL_ASSETS_TABS = {
  '/digital-assets': 'Digital assets',
  '/custom-asset/add': 'Transactions',
}

type Props = {
  children: ?React$Node,
}

class DigitalAssetsLayout extends Component<Props> {
  componentDidMount() {
    console.log('MOUNT: DigitalAssetsLayout')
  }

  componentWillUnmount() {
    console.log('UNMOUNT: DigitalAssetsLayout')
  }

  render() {
    const {
      children,
    } = this.props

    return (
      <MenuLayout>
        <div className='digital-assets-layout'>
          <div className='header'>
            <JTabs tabs={DIGITAL_ASSETS_TABS} />
            <div className='search'>
              <JSearch
                onChange={console.log}
                value=''
                placeholder='search...'
              />
            </div>
          </div>
          <div className='content'>
            <Scrollbars autoHide>
              {children}
            </Scrollbars>
          </div>
        </div>
      </MenuLayout>
    )
  }
}

export default DigitalAssetsLayout
