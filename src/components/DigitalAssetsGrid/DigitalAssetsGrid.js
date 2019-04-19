// @flow

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import {
  JIcon, JLink, JSearch,
} from 'components/base'
import { AssetItemNew } from 'components'
import homeStyle from 'pages/Home/home.m.scss'

type Props = {|
  +items: AssetAddress[],
|}

type State = {|
  +searchQuery: string,
|}

class DigitalAssetsList extends PureComponent<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      searchQuery: '',
    }
  }

  handleSearch = (searchQuery) => {
    this.setState({ searchQuery })
    console.log(this.state.searchQuery)
  }

  render() {
    return (
      <div>
        <div className={homeStyle.actions}>
          <div className={homeStyle.search}>
            <JSearch
              onChange={this.handleSearch}
              placeholder={t`Search assets...`}
            />
          </div>
          <JLink
            className={homeStyle.setting}
            href='/assets'
            title={t`Assets manager`}
          >
            <JIcon
              color='gray'
              name='setting-grid'
            />
          </JLink>
        </div>
        <ul className='digital-assets-grid'>
          {this.props.items.map((address: AssetAddress) => (
            <li key={address}>
              <AssetItemNew
                address={address}
              />
            </li>
          ))
          }
        </ul>
      </div>
    )
  }
}

export default React.memo/* :: <Props> */(DigitalAssetsList)
