// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { PopupButton } from 'components'

import {
  JText,
  JCheckbox,
} from 'components/base'

import styles from './transactionsFilter.m.scss'

type Props = {|
  +setOnlyPending: (boolean) => void,
  +i18n: I18nType,
  +filterCount: number,
  +isPendingFiltered: boolean,
|}

class TransactionsFilter extends PureComponent<Props> {
  static defaultProps = {
    isPendingFiltered: false,
  }

  render() {
    const {
      setOnlyPending,
      i18n,
      filterCount,
      isPendingFiltered,
    }: Props = this.props

    return (
      <PopupButton
        icon={filterCount ? 'filter-selected' : 'filter'}
        counter={filterCount}
      >
        <div className={styles.core}>
          <div className={styles.title}>
            <JText
              color='gray'
              size='normal'
              weight='bold'
              value={i18n._(
                'TransactionsFilter.filter',
                null,
                { defaults: 'Filter' },
              )}
              whiteSpace='wrap'
            />
          </div>
          <JCheckbox
            onChange={setOnlyPending}
            name='only-pending'
            label={i18n._(
              'TransactionsFilter.pendingOnly',
              null,
              { defaults: 'Only pending' },
            )}
            isChecked={isPendingFiltered}
          />
        </div>
      </PopupButton>
    )
  }
}

const TransactionsFilterEnhanced = withI18n()(TransactionsFilter)
export { TransactionsFilterEnhanced as TransactionsFilter }
