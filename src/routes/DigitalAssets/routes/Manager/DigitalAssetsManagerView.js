// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import {
  DigitalAssetsManager,
  RoundIconButton,
  type DigitalAssetsGridItemType,
} from 'components'

import { JSearch, JText } from 'components/base'

type Props = {|
  openView: () => void,
  closeView: () => void,
  setSearchQuery: (string) => void,
  addAssetClick: () => void,
  items: Array<DigitalAssetsGridItemType>,
  deleteCustomAsset: (Address) => void,
  setAssetIsActive: (Address, boolean) => void,
|}

class DigitalAssetsManagerView extends Component<Props> {
  componentDidMount() {
    this.props.openView()
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  render() {
    const {
      items,
      setSearchQuery,
      addAssetClick,
      deleteCustomAsset,
      setAssetIsActive,
    } = this.props

    return (
      <div className='digital-assets-grid-view'>
        <div className='header'>
          <div className='container'>
            <div className='title'>
              <JText value='Assets manager' size='header' color='gray' />
            </div>
            <div className='actions'>
              <div className='search'>
                <JSearch
                  onQueryChange={setSearchQuery}
                  placeholder='Search asset...'
                />
              </div>
              <RoundIconButton
                color='gray'
                iconName='add'
                onClick={addAssetClick}
              />
            </div>
          </div>
        </div>
        <div className='content'>
          <Scrollbars autoHide>
            <DigitalAssetsManager
              items={items}
              deleteCustomAsset={deleteCustomAsset}
              setAssetIsActive={setAssetIsActive}
            />
          </Scrollbars>
        </div>
      </div>
    )
  }
}

export default DigitalAssetsManagerView
