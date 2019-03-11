// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { t } from 'ttag'

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
  // FIXME: Temporary mapDispatchToProps solution
  // fix when mapDispatchToProps shorthand will be supported by react-redux
  // see related issue: https://github.com/flow-typed/flow-typed/issues/746
  +onClickGoBack: Function,
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
      onClickGoBack,
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
              <JText size='tab' color='gray' value={t`Assets manager`} />
            </div>
            <div className='actions'>
              <div className='search'>
                <JSearch onChange={setSearchQuery} placeholder={t`Search asset...`} />
              </div>
              <div onClick={addAsset} className='button add' title={t`Add asset`}>
                <JIcon name='add' color='gray' />
              </div>
              <div onClick={onClickGoBack} className='button close' title={t`Close`}>
                <JIcon name='cross' color='gray' />
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
