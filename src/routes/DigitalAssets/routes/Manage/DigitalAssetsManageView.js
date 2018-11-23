// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import { DigitalAssetsManage } from 'components'

import { JSearch, JText, JIcon } from 'components/base'

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +setSearchQuery: (string) => void,
  +addAssetClick: () => void,
  +items: Array<DigitalAssetsGridItemType>,
  +deleteCustomAsset: (Address) => void,
  +setAssetIsActive: (Address, boolean) => void,
  +editAsset: (Address) => void,
|}

class DigitalAssetsManageView extends Component<Props> {
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
      editAsset,
    } = this.props

    return (
      <div className='digital-assets-manage-view'>
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
              <div className='add' onClick={addAssetClick}>
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
            <DigitalAssetsManage
              items={items}
              deleteCustomAsset={deleteCustomAsset}
              setAssetIsActive={setAssetIsActive}
              editAsset={editAsset}
            />
          </Scrollbars>
        </div>
      </div>
    )
  }
}

export default DigitalAssetsManageView
