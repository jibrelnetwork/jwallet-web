// @flow

import React from 'react'

import JSearch from 'components/base/__new__/JSearch'

const TransactionsActions = ({ search, searchQuery }: Props) => (
  <div className='actions'>
    <JSearch
      onChange={search}
      value={searchQuery}
      placeholder='Type date, template etc'
    />
  </div>
)

type Props = {
  search: Function,
  searchQuery: string,
}

export default TransactionsActions
