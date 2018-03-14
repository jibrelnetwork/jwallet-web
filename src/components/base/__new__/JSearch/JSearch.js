// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/handle'
import JIcon from 'components/base/__new__/JIcon'

const JSearch = ({ onQueryChange, toggle, query, placeholder, isActive }: Props) => (
  <div className='j-search'>
    <SearchIcon
      onClick={toggle}
      size={'medium'}
      name={'search'}
      isActive={isActive}
    />
    <div className={classNames('field', { '-active': isActive })}>
      <input
        onChange={onQueryChange}
        value={query}
        placeholder={placeholder}
        type='text'
        className='input'
      />
      <SearchIcon
        onClick={toggle}
        size={'small'}
        name={'close'}
        isActive
      />
    </div>
  </div>
)

const SearchIcon = ({
  onClick,
  size,
  name,
  isActive,
}: IconProps) => (
  <div onClick={handle(onClick)(!isActive)} className='icon-wrap'>
    <JIcon size={size} name={name} />
  </div>
)

type Props = {
  onQueryChange: Function,
  toggle: Function,
  query: string,
  placeholder: string,
  isActive: boolean,
}

type IconProps = {
  onClick: Function,
  size: string,
  name: string,
  isActive: boolean,
}

export default JSearch
