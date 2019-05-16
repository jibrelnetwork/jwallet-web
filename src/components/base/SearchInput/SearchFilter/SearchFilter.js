// @flow strict

import React from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

import { JIcon } from 'components/base'

import { useFocus } from 'utils/hooks/useFocus'

import JRaisedButton from 'components/base/JRaisedButton'
import searchFilterStyle from 'components/base/SearchInput/SearchFilter/searchFilter.m.scss'

type Props = {|
  activeCount?: number,
  children: React$Node,
|}

export function SearchFilter({
  activeCount,
  children,
}: Props) {
  const [isFocused, {
    onFocus,
    onBlur,
  }] = useFocus()

  return (
    <div className={`__search-filter ${searchFilterStyle.core}`}>
      {isFocused && (
        <div
          className={`__overlay ${searchFilterStyle.overlay}`}
          onClick={onBlur}
        />
      )}
      <JRaisedButton
        theme='additional'
        className={classNames(
          searchFilterStyle.button,
          isFocused && searchFilterStyle.active,
        )}
        onClick={isFocused ? onBlur : onFocus}
      >
        {t`Filter`}
        {!!activeCount && activeCount > 0 && (
          <em className={searchFilterStyle.count}>
            {activeCount}
          </em>
        )}
      </JRaisedButton>
      <div
        className={classNames(
          searchFilterStyle.dropdown,
          isFocused && searchFilterStyle.open,
        )}
      >
        <button
          className={`__close ${searchFilterStyle.close}`}
          type='button'
          onClick={onBlur}
          title={t`Close filter`}
        >
          <JIcon name='ic_close_24-use-fill' />
        </button>
        {children}
      </div>
    </div>
  )
}

SearchFilter.defaultProps = {
  activeCount: 0,
}
