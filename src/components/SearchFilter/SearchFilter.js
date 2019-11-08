// @flow strict

import React from 'react'
import classNames from 'classnames'

import { useI18n } from 'app/hooks'
import { useFocus } from 'utils/hooks/useFocus'

import {
  JIcon,
  Button,
} from 'components/base'

import styles from './searchFilter.m.scss'

type Props = {|
  +children: React$Node,
  +activeCount: number,
|}

export default function SearchFilter({
  children,
  activeCount,
}: Props) {
  const [isFocused, {
    onBlur: handleBlur,
    onFocus: handleFocus,
  }] = useFocus()

  const i18n = useI18n()

  // JIcon data-focused is required to turn off weird webpack optimization that breaks storybook
  return (
    <div className={`__search-filter ${styles.core}`}>
      {isFocused && (
        <div
          onClick={handleBlur}
          className={styles.overlay}
        />
      )}
      <Button
        onClick={isFocused ? handleBlur : handleFocus}
        className={classNames(
          styles.button,
          isFocused && styles.active,
        )}
        theme='additional'
      >
        {i18n._(
          'common.SearchInput.SearchFilter.label',
          null,
          { defaults: 'Filter' },
        )}
        {!!activeCount && (
          <em className={styles.count}>
            {activeCount}
          </em>
        )}
      </Button>
      <div
        className={classNames(
          styles.dropdown,
          isFocused && styles.open,
        )}
      >
        <button
          onClick={handleBlur}
          className={styles.close}
          title={i18n._(
            'components.base.SearchInput.SearchFilter.close',
            null,
            { defaults: 'Close filter' },
          )}
          type='button'
        >
          <JIcon
            data-focused={isFocused}
            name='ic_close_24-use-fill'
          />
        </button>
        {children}
      </div>
    </div>
  )
}

SearchFilter.defaultProps = {
  activeCount: 0,
}
