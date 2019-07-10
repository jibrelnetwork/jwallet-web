// @flow strict

import classNames from 'classnames'
import React, { Children } from 'react'
import { i18n } from 'i18n/lingui'

import { JIcon } from 'components/base'

import { useFocus } from 'utils/hooks/useFocus'

import searchInputStyle from './searchInput.m.scss'

type Props = {|
  +onChange: (SyntheticInputEvent<HTMLInputElement>) => void,
  +value: ?string,
  className?: ?string,
  children?: ?React$Node,
|}

export function SearchInput({
  onChange,
  value,
  className,
  children,
}: Props) {
  const [isFocused, {
    onFocus,
    onBlur,
  }] = useFocus()

  return (
    <div
      className={classNames(
        '__search',
        searchInputStyle.core,
        isFocused && searchInputStyle.focused,
        className,
      )}
    >
      <label className={searchInputStyle.label}>
        <JIcon
          className={searchInputStyle.icon}
          name='ic_search_24-use-fill'
        />
        <input
          className={searchInputStyle.input}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          placeholder={i18n._(
            'SearchInput.search',
            null,
            { defaults: 'Search' },
          )}
        />
      </label>
      {Children.count(children) > 0 && (
        <aside className={searchInputStyle.aside}>
          {children}
        </aside>
      )}
    </div>
  )
}

SearchInput.defaultProps = {
  className: null,
  value: undefined,
  children: null,
}
