// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import DigitalAssetsManage from 'components/DigitalAssetsManage'

import {
  JIcon,
  JText,
  JSearch,
} from 'components/base'

type Props = {|
  +addAsset: () => void,
  +openView: () => void,
  +closeView: () => void,
  +editAsset: (Address) => void,
  +setSearchQuery: (string) => void,
  +deleteCustomAsset: (Address) => void,
  +setAssetIsActive: (Address, boolean) => void,
  +items: DigitalAssetWithBalance[],
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
      addAsset,
      setSearchQuery,
      deleteCustomAsset,
      setAssetIsActive,
      editAsset,
    } = this.props

    return (
      <div className='digital-assets-manage-view'>
        <div className='header'>
          <div className='container'>
            <div className='title'>
              <JText size='tab' color='gray' value='Assets manager' />
            </div>
            <div className='actions'>
              <div className='search'>
                <JSearch onChange={setSearchQuery} placeholder='Search asset...' />
              </div>
              <div onClick={addAsset} className='add' title='Add asset'>
                <JIcon name='add' color='gray' size='medium' />
              </div>
            </div>
          </div>
        </div>
        <div className='content'>
          <Scrollbars autoHide>
            <DigitalAssetsManage
              editAsset={editAsset}
              setAssetIsActive={setAssetIsActive}
              deleteCustomAsset={deleteCustomAsset}
              items={items}
            />
          </Scrollbars>
        </div>
      </div>
    )
  }
}

export default DigitalAssetsManageView
