// @flow

import React from 'react'
import { Link } from 'react-router'

import { JIcon, JSearch, JText } from 'components/base/__new__'

const DigitalAssetsActions = ({ search, searchQuery }: Props) => (
  <div className='actions'>
    <Link to='/digital-assets/add' className='link' >
      <JIcon size='small' name='plus' />
      <JText value='header.actions.addCustomAsset' />
    </Link>
    <JSearch
      onChange={search}
      value={searchQuery}
      placeholder='search...'
    />
  </div>
)

type Props = {
  search: Function,
  searchQuery: string,
}

export default DigitalAssetsActions
