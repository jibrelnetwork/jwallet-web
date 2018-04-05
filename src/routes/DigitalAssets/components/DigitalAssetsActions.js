// @flow

import React from 'react'
import { Link } from 'react-router'

import { JIcon, JSearch, JText } from 'components/base'

const DigitalAssetsActions = ({ search, searchQuery }: Props) => (
  <div className='actions'>
    <Link to='/digital-assets/add' className='link' >
      <JIcon size='small' name='plus' color='blue' />
      <JText value='header.actions.addCustomAsset' variants={['bold', 'blue']} />
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
