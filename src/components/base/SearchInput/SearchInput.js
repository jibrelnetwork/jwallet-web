// @flow

import classNames from 'classnames'
import React from 'react'
import { t } from 'ttag'

import { JIcon } from 'components/base'

import { useFocus } from 'utils/hooks/useFocus'

import searchInputStyle from './searchInput.m.scss'

type Props = {|
  +onChange: (string) => void,
  +value: string,
  className?: ?string,
|}

export function SearchInput({
  onChange,
  value,
  className,
}: Props) {
  const [isFocused, {
    onFocus,
    onBlur,
  }] = useFocus()

  return (
    <label
      className={classNames(
        '__search',
        searchInputStyle.core,
        isFocused && searchInputStyle.focused,
        className,
      )}
    >
      <JIcon
        className={searchInputStyle.icon}
        name='ic_search_24-use-fill'
      />
      <input
        type='search'
        className={searchInputStyle.input}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        placeholder={t`Search`}
      />
    </label>
  )
}

SearchInput.defaultProps = {
  className: null,
}
