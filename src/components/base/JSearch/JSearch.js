// @flow

import React from 'react'
import classNames from 'classnames'

import JIcon from 'components/base/JIcon'
import handle from 'utils/eventHandlers/handle'

const JSearch = ({ onQueryChange, onToggle, query, placeholder, isActive }: Props) => (
  <div className={classNames('j-search', isActive && '-active', query && '-value')}>
    <div onClick={handle(onToggle)(!isActive)} className='search'>
      <JIcon size={'medium'} name={'search'} color='gray' />
    </div>
    <div className='field'>
      <input
        onChange={onQueryChange}
        value={query}
        placeholder={placeholder}
        type='text'
        className='input'
      />
      <div onClick={handle(onToggle)(false)} className='close'>
        <JIcon size={'small'} name={'close'} color='gray' />
      </div>
    </div>
  </div>
)

type Props = {
  onToggle: Function,
  onQueryChange: Function,
  query: string,
  placeholder: string,
  isActive: boolean,
}

export default JSearch
