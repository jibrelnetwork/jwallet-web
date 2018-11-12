// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import { JSearch, JText, JIcon } from 'components/base'

import {
  DigitalAssetsGrid,
  type DigitalAssetsGridItemType,
} from 'components'

type Props = {|
  setSearchQuery: (string) => void,
  items: Array<DigitalAssetsGridItemType>,
|}

class DigitalAssetsGridView extends Component<Props> {
  render() {
    const {
      items,
      setSearchQuery,
    } = this.props

    return (
      <div className='digital-assets-grid-view'>
        <div className='header'>
          <div className='container'>
            <div className='title'>
              <JText value='Assets manager' size='header' color='white' />
            </div>
            <div className='actions'>
              <div className='search'>
                <JSearch
                  onQueryChange={setSearchQuery}
                  placeholder='Search asset...'
                />
              </div>
              <div className='add'>
                <JIcon
                  size='medium'
                  color='gray'
                  name='add'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='content'>
          <Scrollbars autoHide>
            <DigitalAssetsGrid
              items={items}
            />
          </Scrollbars>
        </div>
      </div>
    )
  }
}

export default DigitalAssetsGridView
