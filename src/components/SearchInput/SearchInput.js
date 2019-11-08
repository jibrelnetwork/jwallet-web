// @flow strict

import classNames from 'classnames'
import React, { Children } from 'react'
import { type I18n } from '@lingui/core'

import { useI18n } from 'app/hooks'
import { JIcon } from 'components/base'
import { useFocus } from 'utils/hooks/useFocus'

import styles from './searchInput.m.scss'

type Props = {|
  +onChange: (SyntheticInputEvent<HTMLInputElement>) => any,
  +children: ?React$Node,
  +value: ?string,
  +className: ?string,
|}

export default function SearchInput({
  children,
  value,
  className,
  onChange: handleChange,
}: Props) {
  const [isFocused, {
    onBlur: handleBlur,
    onFocus: handleFocus,
  }] = useFocus()

  const i18n: I18n = useI18n()

  return (
    <div
      className={classNames(
        '__search-input',
        styles.core,
        isFocused && styles.focused,
        className,
      )}
    >
      <label
        className={styles.label}
        htmlFor='search-input'
      >
        <JIcon
          className={styles.icon}
          name='ic_search_24-use-fill'
        />
        <input
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          value={value}
          className={styles.input}
          placeholder={i18n._(
            'components.SearchInput.placeholder',
            null,
            { defaults: 'Search' },
          )}
          id='search-input'
          maxLength={256}
        />
      </label>
      {Children.count(children) > 0 && (
        <aside className={styles.aside}>
          {children}
        </aside>
      )}
    </div>
  )
}

SearchInput.defaultProps = {
  children: null,
  value: null,
  className: null,
}
