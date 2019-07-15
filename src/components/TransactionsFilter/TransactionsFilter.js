// @flow

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import PopupButton from 'components/PopupButton'

import {
  JText,
  JCheckbox,
} from 'components/base'

type Props = {|
  +setOnlyPending: (boolean) => void,
  +filterCount: number,
  +isOnlyPending: boolean,
  +i18n: I18nType,
|}

class TransactionsFilter extends PureComponent<Props> {
  static defaultProps = {
    isOnlyPending: false,
  }

  render() {
    const {
      setOnlyPending,
      filterCount,
      isOnlyPending,
      i18n,
    } = this.props

    return (
      <PopupButton icon={filterCount ? 'filter-selected' : 'filter'} counter={filterCount}>
        <div className='transactions-filter'>
          <div className='title'>
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
            isChecked={isOnlyPending}
          />
        </div>
      </PopupButton>
    )
  }
}

export default withI18n()(TransactionsFilter)
