// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/handle'
import JIcon from 'components/base/__new__/JIcon'

const JSearch = ({ onQueryChange, onToggle, query, placeholder, isActive }: Props) => (
  <div className='j-search'>
    <div onClick={handle(onToggle)(!isActive)} className='search'>
      <JIcon size={'medium'} name={'search'} />
    </div>
    <div className={classNames('field', { '-active': isActive })}>
      <input
        onChange={onQueryChange}
        value={query}
        placeholder={placeholder}
        type='text'
        className='input'
      />
      <div onClick={handle(onToggle)(false)} className='close'>
        <JIcon size={'small'} name={'close'} />
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
