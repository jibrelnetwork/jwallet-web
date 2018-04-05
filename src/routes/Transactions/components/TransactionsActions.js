// @flow

import React from 'react'

import JSearch from 'components/base/JSearch'

const TransactionsActions = ({ search, searchQuery }: Props) => (
  <div className='actions'>
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

export default TransactionsActions
